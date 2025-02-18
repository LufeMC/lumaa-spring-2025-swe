import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Tasks from '../pages/Tasks';
import { tasks } from '../services/api';

// Mock the tasks module
jest.mock('../services/api', () => ({
  tasks: {
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock the auth context
jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    isAuthenticated: true,
    logout: jest.fn(),
  }),
}));

const mockTasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    isComplete: false,
    userId: 1,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    isComplete: true,
    userId: 1,
  },
];

describe('Tasks Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (tasks.getAll as jest.Mock).mockResolvedValue(mockTasks);
  });

  const renderTasks = () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Tasks />
        </AuthProvider>
      </MemoryRouter>
    );
  };

  test('renders task list with loading state', async () => {
    (tasks.getAll as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockTasks), 100))
    );
    
    renderTasks();
    
    // Check loading state
    expect(screen.getByTestId('tasks-loading')).toBeInTheDocument();
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('tasks-loading')).not.toBeInTheDocument();
    });

    // Verify tasks are rendered
    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/task 2/i)).toBeInTheDocument();
  });

  test('shows error state', async () => {
    (tasks.getAll as jest.Mock).mockRejectedValueOnce(new Error('Failed to load tasks'));
    
    renderTasks();
    
    await waitFor(() => {
      expect(screen.getByText(/failed to load tasks/i)).toBeInTheDocument();
    });
  });

  test('creates new task successfully', async () => {
    const newTask = {
      id: 3,
      title: 'New Task',
      description: 'New Description',
      isComplete: false,
      userId: 1,
    };

    (tasks.create as jest.Mock).mockResolvedValueOnce(newTask);
    (tasks.getAll as jest.Mock)
      .mockResolvedValueOnce(mockTasks)
      .mockResolvedValueOnce([...mockTasks, newTask]);

    renderTasks();

    // Wait for initial tasks to load
    await waitFor(() => {
      expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    });

    // Fill in the form
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /create/i });
    
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.click(submitButton);

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/task created successfully/i)).toBeInTheDocument();
    });

    // Check for new task in the list
    await waitFor(() => {
      const tasksList = screen.getByRole('list');
      expect(within(tasksList).getByText('New Task')).toBeInTheDocument();
    });
  });

  test('handles task completion toggle', async () => {
    const updatedTask = { ...mockTasks[0], isComplete: true };
    (tasks.update as jest.Mock).mockResolvedValueOnce(updatedTask);
    (tasks.getAll as jest.Mock)
      .mockResolvedValueOnce(mockTasks)
      .mockResolvedValueOnce(mockTasks.map(t => t.id === 1 ? updatedTask : t));

    renderTasks();

    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    });

    // Find and click the checkbox for Task 1
    const taskItem = screen.getByText(/task 1/i).closest('li');
    if (!taskItem) throw new Error('Task item not found');
    const checkbox = within(taskItem).getByRole('checkbox');
    fireEvent.click(checkbox);

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/task marked as complete/i)).toBeInTheDocument();
    });

    // Verify checkbox is checked
    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });

  test('handles task deletion', async () => {
    (tasks.delete as jest.Mock).mockResolvedValueOnce(undefined);
    (tasks.getAll as jest.Mock)
      .mockResolvedValueOnce(mockTasks)
      .mockResolvedValueOnce(mockTasks.slice(1));

    renderTasks();

    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    });

    // Find and click delete button for Task 1
    const taskItem = screen.getByText(/task 1/i).closest('li');
    if (!taskItem) throw new Error('Task item not found');
    const deleteButton = within(taskItem).getByLabelText(/delete/i);
    fireEvent.click(deleteButton);

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/task deleted successfully/i)).toBeInTheDocument();
    });

    // Verify task is removed
    await waitFor(() => {
      expect(screen.queryByText(/task 1/i)).not.toBeInTheDocument();
    });
  });

  test('handles task editing', async () => {
    const updatedTask = { ...mockTasks[0], title: 'Updated Task' };
    (tasks.update as jest.Mock).mockResolvedValueOnce(updatedTask);
    (tasks.getAll as jest.Mock)
      .mockResolvedValueOnce(mockTasks)
      .mockResolvedValueOnce(mockTasks.map(t => t.id === 1 ? updatedTask : t));

    renderTasks();

    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    });

    // Find and click edit button for Task 1
    const taskItem = screen.getByText(/task 1/i).closest('li');
    if (!taskItem) throw new Error('Task item not found');
    const editButton = within(taskItem).getByLabelText(/edit/i);
    fireEvent.click(editButton);

    // Update the title
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'Updated Task' } });

    // Submit the update
    const updateButton = screen.getByRole('button', { name: /update/i });
    fireEvent.click(updateButton);

    // Check for success message and updated task
    await waitFor(() => {
      expect(screen.getByText(/task updated successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/updated task/i)).toBeInTheDocument();
    });
  });

  test('shows empty state', async () => {
    (tasks.getAll as jest.Mock).mockResolvedValueOnce([]);
    
    renderTasks();
    
    await waitFor(() => {
      expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
    });
  });
}); 