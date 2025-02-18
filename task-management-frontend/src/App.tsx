import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false); 
    navigate('/'); 
  };
  

  return (
    <div>
      {/* Only show nav when not authenticated */}
      {!isAuthenticated && (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}

      {/* Only render the container when needed */}
      {isAuthenticated || window.location.pathname.includes('login') || window.location.pathname.includes('register') ? (
        <div className="container">
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
                <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
              </>
            ) : (
              <Route path="/tasks" element={<TaskList />} />
            )}
          </Routes>
        </div>
      ) : null}
    </div>
  );
};

export default App;
