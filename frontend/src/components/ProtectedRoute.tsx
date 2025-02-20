import { Navigate } from 'react-router-dom';
import React, { ReactElement } from 'react';

interface ProtectedRouteProps {
  children: ReactElement; // Ensures a single React element is passed
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token'); // ✅ Retrieve token from localStorage

  // If the token exists, render the children; otherwise, redirect to login
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
