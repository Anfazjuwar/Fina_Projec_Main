import { Outlet } from "react-router-dom";
import ShoppingMainHeader from "./headerHome";
import Company from "../company";

function MainlayOut() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common header */}

      <ShoppingMainHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default MainlayOut;
