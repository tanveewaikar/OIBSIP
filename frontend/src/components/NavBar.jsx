import { Link } from "react-router-dom"
export default function NavBar() {
  return (
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Pizza App 🍕</Link>

      <div className="navbar-nav">
        <Link className="nav-link" to="/">Login</Link>
        <Link className="nav-link" to="/register">Register</Link>
        <Link className="nav-link" to="/user">User</Link>
        <Link className="nav-link" to="/admin">Admin</Link>
      </div>
    </nav>
  )
}
