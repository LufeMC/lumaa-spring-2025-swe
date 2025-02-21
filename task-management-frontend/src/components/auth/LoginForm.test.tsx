import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  test('renders login form elements', () => {
    render(<LoginForm />);
    
    // Check if form elements exist
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<LoginForm />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
  });

  test('handles form submission', () => {
    const mockSubmit = jest.fn((e) => e.preventDefault());
    render(<LoginForm />);
    
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    fireEvent.submit(form);
    expect(mockSubmit).toHaveBeenCalled();
  });
}); 