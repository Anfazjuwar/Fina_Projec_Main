import "./styles.css";
import { useSelector } from "react-redux";
import SingleChat from "./SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const selectedChat = useSelector((state) => state.chat.selectedChat);

  return (
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } md:flex flex-col items-center p-3 bg-white w-full md:w-[68%] rounded-lg border`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatbox;
