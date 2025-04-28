import { useDispatch, useSelector } from "react-redux";
// import Address from "@/components/car-view/address"; // Make sure this is your car address component
import img from "../../assets/account.jpg";
// Car-specific cart UI
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { createNewCarOrder } from "@/store/Cars/order-slice"; // Car order slice
import { useToast } from "@/components/ui/use-toast";
import { createCarOrder } from "@/store/Cars/order-silce/order";
import Address from "@/components/shopping-view/address";
import CarCartItemsContent from "@/components/CarsShopping/carCart-items";
import { Link, Navigate } from "react-router-dom";

function CarCheckout() {
  const { carCartItems } = useSelector((state) => state.carCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.carOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    carCartItems && carCartItems.items?.length > 0
      ? carCartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (carCartItems.items.length === 0) {
      toast({
        title: "Your car cart is empty. Please add items to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Please select a shipping address.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: carCartItems._id,
      cartItems: carCartItems.items.map((item) => ({
        productId: item?.carId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createCarOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="object-cover object-center w-full h-full" />
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 mt-5 sm:grid-cols-2">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        <div className="flex flex-col gap-4">
          {carCartItems.items?.length > 0 &&
            carCartItems.items.map((item, idx) => (
              <CarCartItemsContent key={idx} cartItem={item} />
            ))}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-blue-600 underline"
                rel="noreferrer"
              >
                Terms & Conditions
              </Link>
            </label>
          </div>

          <div className="w-full mt-4">
            <Button
              onClick={handleInitiatePaypalPayment}
              className="w-full"
              disabled={!termsAccepted} // 🔒 Disable if not checked
            >
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarCheckout;
