import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<CreateAccount />} />
            </Routes>
        </Router>
    );
};

export default App;
