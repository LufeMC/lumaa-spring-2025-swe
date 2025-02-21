import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import UserDashboard from './Components/UserDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
