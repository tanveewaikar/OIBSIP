import { Link } from "react-router-dom"
export default function NavBar() {
  return (
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top ">
    <div className="container-fluid">
      <Link className="navbar-brand mx-2" to="/">Pizza App 🍕</Link>

      <div className="navbar-nav ms-auto">
        <Link className="nav-link mx-3" to="/">Login</Link>
        <Link className="nav-link mx-3" to="/register">Register</Link>
        <Link className="nav-link mx-3" to="/user">User</Link>
        <Link className="nav-link mx-3" to="/admin">Admin</Link>
        <Link className="nav-link mx-3" to="/pizza">Build Pizza</Link>
        <Link className="nav-link mx-3" to="/my-orders">My Orders</Link>
      </div>
    </div>
    </nav>
  )
}
