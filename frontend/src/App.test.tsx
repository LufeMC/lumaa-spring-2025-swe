import { render, screen } from '@testing-library/react';
import { AuthProvider } from './contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the auth context
const mockUseAuth = jest.fn();
jest.mock('./contexts/AuthContext', () => ({
  ...jest.requireActual('./contexts/AuthContext'),
  useAuth: () => mockUseAuth(),
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
}));

describe('App Component', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login page when not authenticated', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('renders tasks page when authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Task Manager')).toBeInTheDocument();
    expect(screen.getByText(/create new task/i)).toBeInTheDocument();
  });
});
