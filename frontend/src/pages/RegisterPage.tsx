import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      setMessage(response.data.message);
      alert('Registration successful! Please log in.');
      navigate('/'); // Redirect after registration
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #ece9e6, #ffffff)',
      }}
    >
      <div
        style={{
          backgroundColor: '#fdfdfd',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px', fontSize: '28px', color: '#333' }}>📝 Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              margin: '10px 0',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#4caf50')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              margin: '10px 0',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#4caf50')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '15px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4caf50')}
          >
            Register
          </button>
        </form>
        {message && (
          <p
            style={{
              marginTop: '15px',
              fontWeight: 'bold',
              color: message.includes('success') ? 'green' : 'red',
            }}
          >
            {message}
          </p>
        )}
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
          Already have an account?{' '}
          <Link to="/" style={{ color: '#4caf50', textDecoration: 'none', fontWeight: 'bold' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
