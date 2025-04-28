import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Redirect from "/" based on role
  if (location.pathname === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    return <Navigate to="/shop/home" />;
  }

  // Block access to /admin/* routes for non-admins
  if (
    location.pathname.includes("/admin") &&
    (!isAuthenticated || user?.role !== "admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Block access to user-specific pages like checkout/account if not authenticated
  if (
    [
      "/shop/checkout",
      "/shop/account",
      "/shop/payment-success",
      "/shop/paypal-return",
    ].includes(location.pathname) &&
    !isAuthenticated
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Prevent logged-in users from accessing /login or /register
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  return <>{children}</>;
}

export default CheckAuth;
