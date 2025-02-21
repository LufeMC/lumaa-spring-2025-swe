import Logo from "../components/Logo";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-bg-gray-100 ">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome, {user?.username}!</h2>
        <button onClick={handleLogout} className="mt-4 bg-primary text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
