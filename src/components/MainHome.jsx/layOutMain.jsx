import { Outlet } from "react-router-dom";
import ShoppingMainHeader from "./headerHome";
import Company from "../company";
// import ChatDialog from "../chat/chat";

function MainlayOut() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common header */}

      <ShoppingMainHeader />
      <main className="flex flex-col w-full">
        <Outlet />
        {/* <ChatDialog /> */}
      </main>
    </div>
  );
}

export default MainlayOut;
