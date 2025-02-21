import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Get state from context

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <nav>
        {isAuthenticated ? (
          <>
            <Link to="/tasks">Tasks</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks/new"
          element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks/edit/:id"
          element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />}
        />
        <Route 
          path="*" element={<Navigate to={isAuthenticated ? '/tasks' : '/login'} />}
        />
      </Routes>
    </Router>
  );
};

export default App;