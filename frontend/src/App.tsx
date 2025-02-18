import React from 'react';
import { Navigate } from 'react-router-dom';
import { Login, Register, Task } from './pages';
import { JSX } from '@emotion/react/jsx-runtime';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

interface ProtectedRouteProps {
  element: JSX.Element;
}

// PROTECTED ROUTE
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return element;
};

// ROUTES
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Task />} />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;