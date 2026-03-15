import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(error.response?.data?.message || "Something went wrong");

    }
  };

  return (

    <div className="container page-container mt-5">

      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>

        <h3 className="text-center mb-3 title">Reset Password</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label>New Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button className="btn btn-success w-100">
            Reset Password
          </button>

        </form>

      </div>

    </div>

  );
}

export default ResetPassword;