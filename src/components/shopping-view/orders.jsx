import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
// import CarOrderDetailsView from "./car-order-details"; // ✅ Optional: if you have one
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
// import {
//   getAllCarOrdersByUser,
//   getCarOrderDetails,
//   resetCarOrderDetails,
// } from "@/store/Cars/cars-slice"; // ✅ Adjust path if needed
import { Badge } from "../ui/badge";
import CarOrderDetailsView from "../CarsShopping/carOrder-details";
import {
  getAllCarOrdersByUser,
  getCarOrderDetails,
  resetCarOrderDetails,
} from "@/store/Cars/order-silce/order";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openCarDetailsDialog, setOpenCarDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const { orderList: carList, orderDetails: carDetails } = useSelector(
    (state) => state.carOrder
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user?.id));
      dispatch(getAllCarOrdersByUser(user?.id));
    }
  }, [dispatch, user]);

  const handleFetchOrderDetails = (id) => {
    dispatch(getOrderDetails(id));
  };

  const handleFetchCarOrderDetails = (id) => {
    dispatch(getCarOrderDetails(id));
  };

  useEffect(() => {
    if (orderDetails) setOpenDetailsDialog(true);
  }, [orderDetails]);

  useEffect(() => {
    if (carDetails) setOpenCarDetailsDialog(true);
  }, [carDetails]);

  return (
    <div className="space-y-10">
      {/* Product Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Order Histo (Parts)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList?.length > 0 ? (
                orderList.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.orderDate?.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          item.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : item.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {item.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${item.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(item._id)}
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
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
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Car Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Car Reserved Orders</CardTitle>
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
              {carList?.length > 0 ? (
                carList.map((carItem) => (
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
                          onClick={() =>
                            handleFetchCarOrderDetails(carItem._id)
                          }
                        >
                          View Details
                        </Button>
                        <CarOrderDetailsView orderDetails={carDetails} />
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
                    No car orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShoppingOrders;
