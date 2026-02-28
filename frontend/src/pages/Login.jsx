import { useState } from "react"
import { useNavigate } from "react-router-dom"

const adminCreds = {
  email :"admin123@gmail.com",
  password :"admin@123"
};
// const userCreds = {
//   email : "user123@gmail.com",
//   password : "user@123"
// }

export default function Login() {
const [email,setEmail] = useState("");
const[password,setPassword] = useState("");
const[error,setError] = useState("");
const navigate = useNavigate();

const handleLogin = (e) => {
  e.preventDefault();
  setError("");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // USER LOGIN
  if (
    storedUser &&
    email === storedUser.email &&
    password === storedUser.password
  ) {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        role: "user",
        email: storedUser.email,
      })
    );
    navigate("/user");
    return;
  }

  // ADMIN LOGIN
  if (
    email === adminCreds.email &&
    password === adminCreds.password
  ) {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        role: "admin",
        email: adminCreds.email,
      })
    );
    navigate("/admin");
    return;
  }

  setError("Invalid Email or Password");
};

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
