import { Outlet } from "react-router-dom";
import ShoppingHeader from "./headerHome.jsx";

function MainlayOut() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default MainlayOut;
