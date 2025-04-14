import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../../common/form";
import { DialogContent } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import { useToast } from "../../ui/use-toast";
import {
  getAllCarOrdersForAdmin,
  getCarOrderDetailsForAdmin,
  updateCarOrderStatusForAdmin,
} from "@/store/admin/car-order-Slice";
// import {
//   getAllCarOrdersForAdmin,
//   getCarOrderDetailsForAdmin,
//   updateCarOrderStatus,
// } from "@/store/admin/car-order-Slice";

const initialFormData = {
  status: "",
};

function AdminCarOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    const { status } = formData;

    dispatch(
      updateCarOrderStatusForAdmin({
        id: orderDetails?._id,
        orderStatus: status,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(getCarOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllCarOrdersForAdmin());
        setFormData(initialFormData);
        toast({ title: res?.payload?.message || "Status updated" });
      }
    });
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Reservation ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Reserved On</p>
            <Label>{orderDetails?.createdAt?.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Total Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Reservation Status</p>
            <Badge
              className={`py-1 px-3 ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-black"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Car Details</div>
            <ul className="grid gap-3">
              {orderDetails?.carInfo ? (
                <li className="flex flex-col gap-1">
                  <span>Title: {orderDetails.carInfo.title}</span>
                  <span>Brand: {orderDetails.carInfo.brand}</span>
                  <span>Category: {orderDetails.carInfo.category}</span>
                  <span>
                    Price: $
                    {orderDetails.carInfo?.salePrice > 0
                      ? orderDetails.carInfo?.salePrice
                      : orderDetails.carInfo?.price}
                  </span>
                </li>
              ) : (
                <li>No car info found</li>
              )}
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Customer Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.userName}</span>
              <span>{orderDetails?.address?.address}</span>
              <span>{orderDetails?.address?.city}</span>
              <span>{orderDetails?.address?.pincode}</span>
              <span>{orderDetails?.address?.phone}</span>
              <span>{orderDetails?.address?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Reservation Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "confirmed", label: "Confirmed" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminCarOrderDetailsView;
