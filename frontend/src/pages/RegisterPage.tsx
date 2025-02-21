import { useNavigate } from "react-router-dom";
import Register from "../components/Register";

const RegisterPage = () => {

  const navigate  = useNavigate();

  return (
    <div
      style={{ display: "flex", placeItems: "center", flexDirection: "column" }}
    >
      <h1>Register</h1>
      <Register />

      <div style={{ marginTop: 20 }}>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
};

export default RegisterPage;
