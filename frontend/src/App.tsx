import { BrowserRouter as Router, Route, Routes, NavLink, useLocation } from 'react-router-dom';
import RecommendPage from './pages/RecommendPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskDashboard from './pages/TaskDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// 🔝 Navbar Component
const Navbar = () => (
  <nav className="navbar">
    <NavLink to="/recommend" className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
      🎬 Movie Recommendations
    </NavLink>
    <NavLink to="/tasks" className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
      ✅ Task Management
    </NavLink>
  </nav>
);

// 🏠 Main App Component
const App = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // 🚫 Hide Navbar on Login & Register pages
  const hideNavbarRoutes = ['/', '/register'];
  const shouldShowNavbar = token && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/recommend"
          element={
            <ProtectedRoute>
              <RecommendPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

// 🚀 Export WrappedApp with Router
export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
