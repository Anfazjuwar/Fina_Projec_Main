import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { addToCarCart, fetchCarCartItems } from "@/store/Cars/cart-slice";
import { setCarDetails } from "@/store/Cars/cars-slice";

function CarProductDetailsDialog({ open, setOpen, carDetails }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
  };

  const specs = [
    { label: "Year", value: carDetails?.year },
    { label: "Fuel Type", value: carDetails?.fuelType },
    { label: "Transmission", value: carDetails?.transmission },
    { label: "Mileage", value: carDetails?.mileage },
    { label: "Color", value: carDetails?.color },
    { label: "Engine Capacity", value: carDetails?.engineCapacity },
    { label: "Horsepower", value: carDetails?.horsepower },
    { label: "Seating Capacity", value: carDetails?.seatingCapacity },
    { label: "Safety Rating", value: carDetails?.safetyRating },
  ];

  const features = [
    { label: "Air Conditioning", value: carDetails?.airConditioning },
    { label: "Power Steering", value: carDetails?.powerSteering },
    { label: "Airbags", value: carDetails?.airbags },
    { label: "Rear Camera", value: carDetails?.rearCamera },
    { label: "Parking Sensors", value: carDetails?.parkingSensors },
    { label: "Sunroof", value: carDetails?.sunroof },
    { label: "Bluetooth", value: carDetails?.bluetooth },
    { label: "Alloy Wheels", value: carDetails?.alloyWheels },
    { label: "Featured", value: carDetails?.isFeatured },
    { label: "Available", value: carDetails?.isAvailable },
  ];

  console.log("carDetails", carDetails);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:p-12 max-w-[90vw]">
        {/* LEFT: Image Preview */}
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
                  alt={`Thumb ${idx}`}
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

        {/* RIGHT: Details */}
        <div>
          <h1 className="mb-1 text-3xl font-extrabold">{carDetails?.title}</h1>
          <p className="mb-4 text-muted-foreground">
            {carDetails?.description}
          </p>
          {carDetails?.phone && (
            <p className="mb-4 text-sm text-muted-foreground">
              Contact: {carDetails?.phone}
            </p>
          )}
          {carDetails?.email && (
            <p className="mb-4 text-sm text-muted-foreground">
              Email: {carDetails?.email}
            </p>
          )}
          :null
          <p className="mb-4 text-2xl font-bold text-primary">
            ${carDetails?.price}
          </p>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {specs.map(
              (item, i) =>
                item.value && (
                  <div key={i} className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {item.label}:
                    </span>{" "}
                    {item.value}
                  </div>
                )
            )}
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-2 mb-6">
            {features.map((item, i) => (
              <div
                key={i}
                className={`text-sm ${
                  item.value ? "text-green-600" : "text-gray-400"
                }`}
              >
                {item.label}:{" "}
                <span className="font-semibold">
                  {typeof item.value === "boolean"
                    ? item.value
                      ? "Yes"
                      : "No"
                    : item.value || "N/A"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 mb-5">
            {carDetails?.totalStock === 0 ? (
              <Button className="w-full cursor-not-allowed opacity-60" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button className="w-full" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CarProductDetailsDialog;
