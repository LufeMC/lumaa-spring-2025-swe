import React, { use } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  // navigate based on which button is clicked 
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Task Management App</h1>
      <button onClick={() => navigate("/register")}> Register </button>
      <button onClick={() => navigate("/login")}> Login </button>
    </div>
  );
};

export default Home;
