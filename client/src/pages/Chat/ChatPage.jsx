import Chatbox from "@/components/chat-com/Chatbox";
import MyChats from "@/components/chat-com/MyChats";
import SideDrawer from "@/components/miscellaneous/SideDrawer";
import { useState } from "react";
import { useSelector } from "react-redux";

const Chatpage = () => {
  const { user } = useSelector((state) => state.auth);

  const [fetchAgain, setFetchAgain] = useState(false);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen font-serif text-6xl">
        <h1 className="text-4xl font-bold">Welcome to Chat App</h1>
        <p className="mt-4 text-lg">Please login to continue</p>
        <a
          href="/login"
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </a>
        <p className="mt-2 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <SideDrawer />
      <div className="flex justify-between w-full h-[91.5vh] p-2 gap-2">
        <MyChats fetchAgain={fetchAgain} />
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </div>
  );
};

export default Chatpage;
