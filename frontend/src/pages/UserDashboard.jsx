import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate()
  const handleLogout = ()=>{
  localStorage.removeItem("auth")
  navigate("/login");
}
  return (
    <div className="container mt-5 pt-5" >
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  )
}
