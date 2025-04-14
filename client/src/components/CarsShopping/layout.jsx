import { Outlet } from "react-router-dom";

import Company from "../company";
import ShoppingCarHeader from "./CarHeader";

function ShoppingCarLayout() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Company />
      {/* common header */}
      <ShoppingCarHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingCarLayout;
