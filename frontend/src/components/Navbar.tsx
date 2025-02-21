import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <div style={{ fontWeight: "bold" }}>Lumaa</div>
      {isAuthenticated ? (
        <>
          <Link to="/tasks">Tasks</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
