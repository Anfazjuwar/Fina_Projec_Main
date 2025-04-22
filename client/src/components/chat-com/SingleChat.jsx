import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import ScrollableChat from "./ScrollableChat";
import ProfileModal from "../miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";
import { getSender, getSenderFull } from "@/config/ChatLogics";
import { setSelectedChat, setNotification } from "@/store/Chat/chat";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const dispatch = useDispatch();
  const { selectedChat, notification } = useSelector((state) => state.chat);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch {
      alert("Failed to load messages.");
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage.trim()) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        socket.emit("new message", data);
        setMessages((prev) => [...prev, data]);
      } catch {
        alert("Failed to send message.");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.find((n) => n._id === newMessageRecieved._id)) {
          dispatch(setNotification([newMessageRecieved, ...notification]));
          setFetchAgain((prev) => !prev);
        }
      } else {
        setMessages((prev) => [...prev, newMessageRecieved]);
      }
    });
  }, [notification, dispatch, setFetchAgain]);

  if (!selectedChat) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-2xl text-muted-foreground">
          Click on a chat to start messaging
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full p-4 bg-white border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => dispatch(setSelectedChat(null))}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <h2 className="text-xl font-semibold">
            {!selectedChat.isGroupChat
              ? getSender(user, selectedChat.users)
              : selectedChat.chatName}
          </h2>

          {!selectedChat.isGroupChat ? (
            <ProfileModal user={getSenderFull(user, selectedChat.users)} />
          ) : (
            isAuthenticated &&
            user?.role === "admin" && (
              <UpdateGroupChatModal
                fetchMessages={fetchMessages}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            )
          )}
        </div>
      </div>

      <div className="flex-1 p-3 overflow-y-auto bg-gray-100 rounded">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ScrollableChat messages={messages} />
        )}
      </div>
      <div className="w-full mt-3">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={typingHandler}
          onKeyDown={sendMessage}
          className="bg-gray-200"
        />
        {istyping && (
          <p className="mt-1 text-sm text-muted-foreground">Typing...</p>
        )}
      </div>
    </div>
  );
};

export default SingleChat;
