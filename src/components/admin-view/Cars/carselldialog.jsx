import { Dialog, DialogContent } from "../../ui/dialog";
import { Separator } from "../../ui/separator";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useEffect, useState } from "react";

function CarSellDetailsDialog({ open, setOpen, carDetails }) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (carDetails?.image) {
      setSelectedImage(
        Array.isArray(carDetails.image) ? carDetails.image[0] : carDetails.image
      );
    }
  }, [carDetails]);

  const handleDialogClose = () => {
    setOpen(false);
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

        {/* RIGHT: Car Info */}
        <div>
          <h1 className="mb-1 text-3xl font-extrabold">{carDetails?.title}</h1>
          <p className="mb-4 text-muted-foreground">
            {carDetails?.description}
          </p>

          {carDetails?.phone && (
            <p className="mb-2 text-sm text-muted-foreground">
              📞 Phone: <strong>{carDetails?.phone}</strong>
            </p>
          )}
          {carDetails?.email && (
            <p className="mb-4 text-sm text-muted-foreground">
              📧 Email: <strong>{carDetails?.email}</strong>
            </p>
          )}

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

          <div className="grid grid-cols-2 gap-2">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CarSellDetailsDialog;
