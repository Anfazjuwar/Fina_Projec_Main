import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Company from "../company";

function ShoppingLayout() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Company />
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
