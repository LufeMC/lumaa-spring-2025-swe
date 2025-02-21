import { useState } from "react";
import { login as apiLogin } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiLogin(username, password);
      login(res);
      toast.success(`Login successful`);
      navigate("/tasks");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(`Login failed: ${error}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="fields"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="fields"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
