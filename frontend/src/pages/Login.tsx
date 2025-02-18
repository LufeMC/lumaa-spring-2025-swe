import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  


    const handleLogin = async () => {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
      
        const data = await response.json();
        console.log("Login Response:", data); 
      
        if (response.ok) {
          localStorage.setItem("token", data.token);
          console.log("Token stored:", localStorage.getItem("token"));
          navigate("/login/dashboard");
        } else {
          setError(data.message || "Login failed");
        }
      };
      

  const handleAccountCreation = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-black">
      <h1 className="mt-32 text-4xl text-center font-bold text-white">Task Management</h1>
      
      <div className="m-16 p-10 w-96 rounded-lg bg-neutral-900 shadow-2xl">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

        <div className="my-3">
          <input
            id="username"
            name="username"
            type="text"
            required
            autoComplete="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-4 py-3 text-lg text-black bg-white border border-transparent focus:border-neutral-900 focus:outline-none transition duration-200"
          />

          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 block w-full px-4 py-3 text-lg text-black bg-white border border-transparent focus:border-neutral-900 focus:ring-1 focus:outline-none transition duration-200"
          />
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={handleLogin}
            className="w-full flex justify-center bg-white px-4 py-3 font-semibold text-black hover:bg-black"
          >
            Login
          </button>

          <p className="mt-3 text-center text-sm text-white">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={handleAccountCreation}
              className="font-semibold gradient-text hover:text-blue-600"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
