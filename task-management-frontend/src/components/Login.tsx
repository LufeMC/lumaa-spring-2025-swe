import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setAuth: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();


  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, { username, password });

   
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setAuth(true);
        navigate('/tasks');
      } else {
        setErrorMessage('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.message || 'Invalid username or password');

     
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
