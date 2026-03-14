import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-bg min-vh-100">
      <div className="dashboard-overlay">
        <h2 className="text-center mb-4">🍕 Welcome to Pizza Builder</h2>

        <div className="card shadow p-4">
          <h4 className="text-center mb-4">User Dashboard</h4>

          {user && (
            <div className="mb-4">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          )}

          <div className="d-grid gap-3">
            <button
              className="btn btn-outline-warning text-yellow"
              onClick={() => navigate("/pizza")}
            >
              Build Pizza
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/my-orders")}
            >
              My Orders
            </button>

            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
