import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Button
      variant="secondary"
      className="h-auto gap-1 px-2 py-1 text-xs rounded-full"
      onClick={handleFunction}
    >
      <span>{user.userName}</span>
      {admin === user._id && (
        <span className="text-muted-foreground">(Admin)</span>
      )}
      <X size={12} />
    </Button>
  );
};

export default UserBadgeItem;
