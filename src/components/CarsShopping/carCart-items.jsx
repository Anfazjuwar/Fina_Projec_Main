import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import {
  deleteCarCartItem,
  updateCarCartQuantity,
} from "@/store/Cars/cart-slice";
// import {
//   updateCarCartItemQty,
//   deleteCarCartItem,
// } from "@/store/Cars/cart-slice";

function CarCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { carCartItems } = useSelector((state) => state.carCart);
  const { carList } = useSelector((state) => state.adminCars);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(item, typeOfAction) {
    if (typeOfAction === "plus") {
      const indexInCart = carCartItems.items.findIndex(
        (i) => i.carId === item.carId
      );

      const carIndex = carList.findIndex((c) => c._id === item.carId);
      const stock = carList[carIndex]?.totalStock || 0;

      if (indexInCart > -1) {
        const currentQty = carCartItems.items[indexInCart].quantity;
        if (currentQty + 1 > stock) {
          toast({
            title: `Only ${stock} items in stock`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      updateCarCartQuantity({
        userId: user?.id,
        carId: item.carId,
        quantity:
          typeOfAction === "plus" ? item.quantity + 1 : item.quantity - 1,
      })
    ).then((res) => {
      if (res.payload?.success) {
        toast({ title: "Cart updated" });
      }
    });
  }

  function handleDelete(item) {
    dispatch(deleteCarCartItem({ userId: user?.id, carId: item.carId })).then(
      (res) => {
        if (res.payload?.success) {
          toast({ title: "Item removed from cart" });
        }
      }
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="object-cover w-20 h-20 rounded"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="w-8 h-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="w-8 h-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleDelete(cartItem)}
          className="mt-1 cursor-pointer"
          size={20}
        />
      </div>
    </div>
  );
}

export default CarCartItemsContent;
