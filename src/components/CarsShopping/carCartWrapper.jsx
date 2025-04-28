import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CarCartItemsContent from "./carCart-items";
// import CarCartItemsContent from "./carCart-items";
// import CarCartItemsContent from "../CarsShopping/cart-items-content"; // ✅ Update this path to match your structure

function CarCartWrapper({ carCartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const totalCartAmount =
    carCartItems?.items?.length > 0
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

  console.log("Cart Items in Redux: hi", carCartItems);

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Car Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-4">
        {carCartItems?.items?.length > 0 ? (
          carCartItems.items.map((item, idx) => (
            <CarCartItemsContent key={idx} cartItem={item} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">No items in cart.</p>
        )}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={() => {
          navigate("/cars/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default CarCartWrapper;
