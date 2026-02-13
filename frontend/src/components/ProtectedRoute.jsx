import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (role && auth.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}
