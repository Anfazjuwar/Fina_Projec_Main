import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, Search } from "lucide-react";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import ProfileModal from "./ProfileModal";
import ChatLoading from "../chat-com/ChatLoading";
import { getSender } from "@/config/ChatLogics";
import {
  setSelectedChat,
  setNotification,
  setChats,
} from "../../store/Chat/chat";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { chats, notification } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const handleSearch = async () => {
    if (!search.trim()) {
      toast({ title: "Please enter a search term", variant: "destructive" });
      return;
    }
    if (!user) {
      toast({
        title: "User not logged in",
        description: "Please log in again.",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(
        `/api/auth/search?search=${search}`,
        config
      );
      console.log("Search response data:", data);
      // Ensure the result is always an array
      setSearchResult(Array.isArray(data) ? data : data.users || []);
    } catch (error) {
      toast({
        title: "Search failed",
        description: error.message,
        variant: "destructive",
      });
      setSearchResult([]); // reset to avoid .map crash
    } finally {
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    console.log("userId", userId);
    console.log("Trying to access chat with:", userId);
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) {
        dispatch(setChats([data, ...chats]));
      }
      dispatch(setSelectedChat(data));
    } catch (error) {
      toast({
        title: "Chat access failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingChat(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };
  // console.log("User token:", user?.token);

  return (
    <>
      {" "}
      <p className="text-xl font-bold text-center text-blue-500">
        You can search for the admin and ask your questions to get the best
        advice. If you’d like to join the community for daily live discussions
        about cars and car parts, you can request to join and stay updated.
      </p>
      <div className="flex items-center justify-between p-2 border-b">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Search User</span>
            </Button>
          </DrawerTrigger>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Search Users</DrawerTitle>
              <DrawerDescription>Find and start chatting</DrawerDescription>
            </DrawerHeader>
            <div className="flex gap-2 p-4">
              <Input
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </div>
            <div className="px-4 pb-4 space-y-2 overflow-y-auto max-h-[300px]">
              {loading ? (
                <ChatLoading />
              ) : Array.isArray(searchResult) && searchResult.length > 0 ? (
                searchResult.map((userData) => (
                  <UserListItem
                    key={userData._id}
                    user={userData} // ✅ correct user from results
                    handleFunction={() => accessChat(userData._id)}
                  />
                ))
              ) : (
                <p className="text-sm text-center text-muted-foreground">
                  No users found.
                </p>
              )}
              {loadingChat && (
                <p className="text-sm text-center">Loading chat...</p>
              )}
            </div>
          </DrawerContent>
        </Drawer>
        <span className="text-xl font-bold">Qustion </span>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative">
                <Bell className="w-5 h-5" />
                {notification.length > 0 && (
                  <span className="absolute px-1 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                    {notification.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              {notification.length === 0 ? (
                <DropdownMenuItem>No new messages</DropdownMenuItem>
              ) : (
                notification.map((notif) => (
                  <DropdownMenuItem
                    key={notif._id}
                    onClick={() => {
                      dispatch(setSelectedChat(notif.chat));
                      dispatch(
                        setNotification(notification.filter((n) => n !== notif))
                      );
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `Group: ${notif.chat.chatName}`
                      : `From: ${getSender(user, notif.chat.users)}`}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* 
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={user?.pic || "/default-avatar.png"}
                    alt={user?.userName || "User"}
                  />
                  <AvatarFallback>
                    {user?.userName?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ProfileModal user={user}>
                <DropdownMenuItem>My Profile</DropdownMenuItem>
              </ProfileModal>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
