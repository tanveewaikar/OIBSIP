import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">

        <Link className="navbar-brand mx-2" to="/">
          Pizza Craft 🍕
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">

            <Link className="nav-link mx-2" to="/">Login</Link>
            <Link className="nav-link mx-2" to="/register">Register</Link>
            <Link className="nav-link mx-2" to="/user">User</Link>
            <Link className="nav-link mx-2" to="/admin">Admin</Link>
            <Link className="nav-link mx-2" to="/pizza">Build Pizza</Link>
            <Link className="nav-link mx-2" to="/my-orders">My Orders</Link>

          </div>
        </div>

      </div>
    </nav>
  )
}