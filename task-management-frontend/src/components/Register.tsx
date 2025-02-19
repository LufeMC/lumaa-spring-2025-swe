import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  setAuth: (auth: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/auth/register`, { username, password });
      
 
      navigate('/login');
    } catch (error: any) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      
      if (error.response && error.response.status === 400) {
        setError('User already exists. Please log in.');
      } else {
        setError('User already exists. Please log in.');
      }


      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
