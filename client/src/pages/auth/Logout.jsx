import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.warn("Logout failed on server, redirecting anyway:", err);
    } finally {
      navigate("/login");
    }
  };
  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-indigo-500/30">
      Logout
    </button>
  );
}
