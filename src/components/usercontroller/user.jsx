import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllUsers,
//   deleteUser,
//   updateUserRole,
// } from "../redux/adminUsersSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  deleteUser,
  fetchAllUsers,
  updateUserRole,
} from "@/store/admin/authadmin-slider/admin";

const AdminUserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.adminUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const openEdit = (user) => {
    setSelectedUser(user);
    setRole(user.role);
  };

  const handleUpdate = () => {
    if (selectedUser) {
      dispatch(updateUserRole({ id: selectedUser._id, role }));
      setSelectedUser(null);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <Card className="mt-4 shadow-lg">
      <CardContent className="p-4">
        <h2 className="mb-4 text-xl font-semibold">Admin: All Users</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="flex gap-2">
                    {/* Edit Role Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => openEdit(user)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Edit Role for {user.userName}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="my-4">
                          <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleUpdate}>Save</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Delete Dialog */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          Are you sure you want to delete {user.userName}?
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUserList;
