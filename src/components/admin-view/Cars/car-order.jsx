import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Dialog } from "../../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";

// import {
//   getAllCarOrdersForAdmin,
//   getCarOrderDetailsForAdmin,
//   resetCarOrderDetails,
// } from "@/store/admin/adminCarOrderSlice"; // Adjust path if needed"; // You need to create this if not done
import AdminCarOrderDetailsView from "./carOrde-deatils";
import {
  getAllCarOrdersForAdmin,
  getCarOrderDetailsForAdmin,
  resetCarOrderDetails,
} from "@/store/admin/car-order-Slice";

function AdminCarOrdersView() {
  const [openCarDetailsDialog, setOpenCarDetailsDialog] = useState(false);
  const dispatch = useDispatch();

  const { carOrderList, carOrderDetails } = useSelector(
    (state) => state.adminCarOrder
  );

  useEffect(() => {
    dispatch(getAllCarOrdersForAdmin());
  }, [dispatch]);

  const handleFetchCarOrderDetails = (id) => {
    dispatch(getCarOrderDetailsForAdmin(id));
  };

  useEffect(() => {
    if (carOrderDetails !== null) setOpenCarDetailsDialog(true);
  }, [carOrderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Car Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Reserved Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carOrderList?.length > 0 ? (
              carOrderList.map((carItem) => (
                <TableRow key={carItem._id}>
                  <TableCell>{carItem._id}</TableCell>
                  <TableCell>{carItem.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        carItem.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : carItem.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                    >
                      {carItem.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${carItem.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openCarDetailsDialog}
                      onOpenChange={() => {
                        setOpenCarDetailsDialog(false);
                        dispatch(resetCarOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() => handleFetchCarOrderDetails(carItem._id)}
                      >
                        View Details
                      </Button>
                      <AdminCarOrderDetailsView
                        orderDetails={carOrderDetails}
                      />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="5"
                  className="text-center text-muted-foreground"
                >
                  No car reservations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminCarOrdersView;
