import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

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

    <div className="container mt-5">

      <div className="card shadow p-4 mx-auto" style={{maxWidth:"500px"}}>

        <h3 className="text-center mb-4">User Dashboard</h3>

        {user && (

          <div className="mb-4">

            <p><strong>Name:</strong> {user.name}</p>

            <p><strong>Email:</strong> {user.email}</p>

            <p><strong>Role:</strong> {user.role}</p>

          </div>

        )}

        <div className="d-grid gap-2">

          <button
            className="btn btn-primary"
            onClick={() => navigate("/pizza")}
          >
            Build Pizza
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/orders")}
          >
            My Orders
          </button>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );
}