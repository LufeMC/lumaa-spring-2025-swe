import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ display: "flex", placeItems: "center", flexDirection: "column" }}
    >
      <h1>Login</h1>
      <Login />
      <div style={{ marginTop: 20 }}>
        Don't have an account yet?{" "}
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
