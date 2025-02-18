import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import TodoListPage from "./TodoListPage";
import Login from './Login';
import Register from './Register';
import './index.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container">
            <h1>Welcome to Task Management</h1>
            <div>
                {!token ? (
                    <>
                        <Link to="/login"><button>Login</button></Link>
                        <Link to="/register"><button>Register</button></Link>
                    </>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/todos" element={<TodoListPage />} />
            </Routes>
        </Router>
    );
};

export default App;