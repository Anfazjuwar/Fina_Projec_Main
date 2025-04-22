import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat, setChats } from "../../store/Chat/chat";
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "../miscellaneous/GroupChatModal";
import ChatLoading from "./ChatLoading";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { selectedChat, chats } = useSelector((state) => state.chat);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const fetchChats = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      dispatch(setChats(data));
    } catch (error) {
      toast({
        title: "Error fetching chats",
        description: "Failed to load chats from server.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Card
      className={`${
        selectedChat ? "hidden md:flex" : "flex"
      } flex-col w-full md:w-1/3 p-4 h-full`}
    >
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-semibold">My Chats</h2>
        {isAuthenticated && user?.role === "admin" && (
          <GroupChatModal>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> New Group
            </Button>
          </GroupChatModal>
        )}
      </div>

      <ScrollArea className="flex-1 pr-2">
        {chats ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => dispatch(setSelectedChat(chat))}
              className={`rounded-lg px-3 py-2 mb-2 cursor-pointer ${
                selectedChat?._id === chat._id
                  ? "bg-primary text-white"
                  : "bg-muted text-black"
              }`}
            >
              <p className="font-medium">
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users) // private chat
                  : chat.users.userName || chat.chatName || "Unnamed Group"}
              </p>

              {chat.latestMessage && (
                <p className="text-xs truncate text-muted-foreground">
                  <b>{chat.latestMessage.sender.userName}:</b>{" "}
                  {chat.latestMessage.content.length > 50
                    ? chat.latestMessage.content.slice(0, 50) + "..."
                    : chat.latestMessage.content}
                </p>
              )}
            </div>
          ))
        ) : (
          <ChatLoading />
        )}
      </ScrollArea>
    </Card>
  );
};

export default MyChats;
