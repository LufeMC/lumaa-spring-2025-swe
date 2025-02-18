import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.message === "Username already exists") {
          throw new Error("This username is already taken. Please choose another.");
        }
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-black">
      <h1 className="mt-32 text-4xl text-center font-bold text-white">
        Create Account
      </h1>
      <div className="m-16 p-10 w-96 rounded-lg bg-neutral-900 shadow-2xl">

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

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
            onClick={handleRegister}
            className="w-full flex justify-center bg-white px-4 py-3 font-semibold text-black hover:bg-black hover:text-white"
          >
            Sign up
          </button>

          <p className="mt-3 text-center text-sm text-white">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="font-semibold gradient-text hover:text-blue-600"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
