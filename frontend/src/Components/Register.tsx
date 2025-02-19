import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      // check if username exists
      const checkResponse = await fetch(`http://localhost:3001/api/auth/register/checkUser?username=` + username);
      const checkData = await checkResponse.json();
      
      console.log(checkData);
      if (checkData.exists) {
        setError("Username already exists");
        return;
      }
  
      // if username is available, create the user 
      const registerResponse = await fetch('http://localhost:3001/api/auth/register/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!registerResponse.ok) {
        throw new Error('Registration failed');
      }
  
      // success
      console.log('User registered successfully');
      setError("");

      //clear the form 
      setUsername("");
      setPassword("");
      setConfirmPassword("");
  
    } catch (err) {
      console.error('Registration error:', err);
      setError("Registration failed. Please try again.");
    }
  };
  

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;