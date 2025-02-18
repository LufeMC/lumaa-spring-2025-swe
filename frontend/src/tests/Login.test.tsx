import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Login from '../pages/Login';
import { auth } from '../services/api';

// Mock the auth module
jest.mock('../services/api', () => ({
  auth: {
    login: jest.fn(),
  }
}));

// Mock the auth context
const mockLogin = jest.fn();
jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
  }),
}));

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the notistack hook
jest.mock('notistack', () => ({
  useSnackbar: () => ({
    enqueueSnackbar: jest.fn(),
  }),
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (auth.login as jest.Mock).mockResolvedValue({ token: 'fake-token' });
    mockLogin.mockResolvedValue(undefined);
  });

  const renderLogin = () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
  };

  test('renders login form', () => {
    renderLogin();
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.getByText(/don't have an account\? register/i)).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    renderLogin();
    const loginButton = screen.getByTestId('login-button');
    
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    });
  });

  test('shows validation error for short username', async () => {
    renderLogin();
    const usernameInput = screen.getByTestId('username-input');
    const loginButton = screen.getByTestId('login-button');
    
    fireEvent.change(usernameInput, { target: { value: 'ab' } });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/username must be at least 3 characters/i)).toBeInTheDocument();
    });
  });

  test('shows validation error for short password', async () => {
    renderLogin();
    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  test('handles successful login', async () => {
    renderLogin();
    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123'
      });
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('shows loading state during login', async () => {
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    renderLogin();
    
    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    
    expect(screen.getByText(/logging in/i)).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    
    await waitFor(() => {
      expect(screen.queryByText(/logging in/i)).not.toBeInTheDocument();
      expect(loginButton).not.toBeDisabled();
    });
  });

  test('clears validation errors when typing', async () => {
    renderLogin();
    const usernameInput = screen.getByTestId('username-input');
    const loginButton = screen.getByTestId('login-button');
    
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    });
    
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    
    await waitFor(() => {
      expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
    });
  });
}); 