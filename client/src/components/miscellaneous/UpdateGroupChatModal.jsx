import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "@/store/Chat/chat";
import { LoaderCircle, Eye } from "lucide-react";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(`/api/auth?search=${query}`, config);
      setSearchResult(data);
    } catch (err) {
      alert("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );

      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
    } catch (err) {
      alert("Rename failed");
    } finally {
      setRenameLoading(false);
      setGroupChatName("");
    }
  };

  // const handleAddUser = async (userToAdd) => {
  //   if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
  //     alert("User already in group");
  //     return;
  //   }
  //   if (selectedChat.groupAdmin._id !== user._id) {
  //     alert("Only admin can add users");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const config = {
  //       headers: { Authorization: `Bearer ${user.token}` },
  //     };
  //     const { data } = await axios.put(
  //       `/api/chat/groupadd`,
  //       { chatId: selectedChat._id, userId: userToAdd._id },
  //       config
  //     );
  //     dispatch(setSelectedChat(data));
  //     setFetchAgain(!fetchAgain);
  //   } catch (err) {
  //     alert("Add user failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      alert("User already in the group");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.put(
        `/api/chat/groupadd`,
        { chatId: selectedChat._id, userId: userToAdd._id },
        config
      );

      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
    } catch (err) {
      console.error("Add user failed:", err);
      alert("Add user failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (userToRemove) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToRemove._id !== user._id
    ) {
      alert("Only admins can remove someone!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        { chatId: selectedChat._id, userId: userToRemove._id },
        config
      );

      dispatch(setSelectedChat(userToRemove._id === user._id ? null : data));
      setFetchAgain(!fetchAgain);
      fetchMessages();
    } catch (err) {
      alert("Remove user failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            {selectedChat.chatName}
          </DialogTitle>
          <DialogDescription className="text-sm text-center">
            Update group name, add or remove users
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          {selectedChat.users.map((u) => (
            <UserBadgeItem
              key={u._id}
              user={u}
              admin={selectedChat.groupAdmin}
              handleFunction={() => handleRemove(u)}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Rename group"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />
          <Button onClick={handleRename} disabled={renameloading}>
            {renameloading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </div>

        <Input
          placeholder="Search users"
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : (
            searchResult.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}
              />
            ))
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGroupChatModal;
