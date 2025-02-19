import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    <div>
      {/* ✅ Always show Login/Register buttons at the top when NOT logged in */}
      {!isAuthenticated && (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}

      <Routes>
        {!isAuthenticated ? (
          <>
            {/* ✅ Homepage only shows Login/Register buttons */}
            <Route path="/" element={null} />
            {/* ✅ Clicking "Login" or "Register" navigates to the respective form */}
            <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
          </>
        ) : (
          <>
            <Route path="/tasks" element={<TaskList />} />
            <Route path="*" element={<Navigate to="/tasks" />} /> {/* Redirect unknown paths */}
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
