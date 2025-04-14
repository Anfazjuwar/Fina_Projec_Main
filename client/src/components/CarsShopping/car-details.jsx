import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
// import {
//   addPublicCarReview,
//   getPublicCarReviews,
// } from "@/store/cars/review-car-slice";
// import { addToCarCart, fetchCarCartItems } from "@/store/cars/car-cart-slice";
// import { setSelectedCar } from "@/store/admin/carProSilce";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { addToCarCart, fetchCarCartItems } from "@/store/Cars/cart-slice";
import { setCarDetails } from "@/store/Cars/cars-slice";

function CarProductDetailsDialog({ open, setOpen, carDetails }) {
  //   const [reviewMsg, setReviewMsg] = useState("");
  //   const [rating, setRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { carCartItems } = useSelector((state) => state.carCart);

  const { toast } = useToast();

  useEffect(() => {
    if (carDetails?.image) {
      setSelectedImage(
        Array.isArray(carDetails.image) ? carDetails.image[0] : carDetails.image
      );
    }
  }, [carDetails]);

  const handleAddToCart = () => {
    dispatch(
      addToCarCart({ userId: user?.id, carId: carDetails._id, quantity: 1 })
    ).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchCarCartItems(user?.id));
        toast({ title: "Car added to cart!" });
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setCarDetails(null));
    setRating(0);
    setReviewMsg("");
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden border rounded-lg">
            <Zoom>
              <img
                src={selectedImage}
                alt={carDetails?.title}
                className="w-full h-[400px] object-cover cursor-zoom-in"
              />
            </Zoom>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {Array.isArray(carDetails?.image) &&
              carDetails.image.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-[70px] h-[70px] object-cover rounded border-2 cursor-pointer ${
                    selectedImage === imgUrl
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                />
              ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold">{carDetails?.title}</h1>
          <p className="mt-4 mb-5 text-2xl text-muted-foreground">
            {carDetails?.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-primary">
              ${carDetails?.price}
            </p>
          </div>

          <div className="mt-5 mb-5">
            {carDetails?.totalStock === 0 ? (
              <Button className="w-full cursor-not-allowed opacity-60">
                Out of Stock
              </Button>
            ) : (
              <Button className="w-full" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            )}
          </div>

          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CarProductDetailsDialog;
