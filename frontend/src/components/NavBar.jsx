import { Link } from "react-router-dom"
export default function NavBar() {
  return (
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 fixed-top ">
    <div className="container-fluid">
      <Link className="navbar-brand mx-2" to="/">Pizza App 🍕</Link>

      <div className="navbar-nav ms-auto">
        <Link className="nav-link mx-4" to="/">Login</Link>
        <Link className="nav-link mx-4" to="/register">Register</Link>
        <Link className="nav-link mx-4" to="/user">User</Link>
        <Link className="nav-link mx-4" to="/admin">Admin</Link>
        <Link className="nav-link mx-4" to="/pizza">Build Pizza</Link>
      </div>
    </div>
    </nav>
  )
}
