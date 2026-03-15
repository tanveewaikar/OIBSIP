import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      alert(res.data.message);
      setEmail("");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container page-container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
        
        <h3 className="text-center mb-3 title">Forgot Password</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email address</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>

      </div>
    </div>
  );
}

export default ForgotPassword;