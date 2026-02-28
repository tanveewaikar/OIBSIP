import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
export default function Login() {
const [email,setEmail] = useState("");
const[password,setPassword] = useState("");
const[error,setError] = useState("");
const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    const { token } = res.data;

    // Save token
    localStorage.setItem("token", token);

    // Decode role from token (optional simple method)
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }

  } catch (error) {
    setError(error.response?.data?.message || "Login failed");
  }
}

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-4">
      <h2 className="text-center mb-4">Login Page</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email : </label>
          <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password : </label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <p>Forgot Password? <a href="/forgot-password">Click here</a> </p>
        <button type ="submit" className="btn btn-success w-100">Login</button>
      </form>
     </div>
    </div>
  )
}
