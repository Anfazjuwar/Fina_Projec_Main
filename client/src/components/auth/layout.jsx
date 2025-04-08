import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex items-center justify-center w-full h-screen p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
