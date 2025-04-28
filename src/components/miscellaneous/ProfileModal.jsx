import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const ProfileModal = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          <span className="cursor-pointer">{children}</span>
        ) : (
          <Button variant="outline">View Profile</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {user.userName}
          </DialogTitle>
          <DialogDescription className="flex flex-col items-center gap-4 mt-4">
            <Avatar className="w-24 h-24">
              <img
                src={user.pic}
                alt={user.userName}
                className="rounded-full"
              />
            </Avatar>
            <p className="text-lg">Email: {user.email}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
