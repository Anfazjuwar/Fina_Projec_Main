import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      className="flex items-center w-full gap-3 px-4 py-2 mb-2 transition-colors rounded-lg cursor-pointer bg-muted hover:bg-primary hover:text-white"
    >
      <Avatar className="w-8 h-8">
        <AvatarImage src={user.pic} alt={user.userName} />
        <AvatarFallback>
          {user.userName?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user.userName}</span>
        <span className="text-xs text-muted-foreground">
          <b>Email:</b> {user.email}
        </span>
      </div>
    </div>
  );
};
export default UserListItem;
