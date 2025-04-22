import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter } from "../../ui/card";

function AdminCarSellTile({
  car,
  setFormData,
  setOpenCreateCarsDialog,
  setCurrentEditedId,
  handleDelete,
  handleViewDetails, // ✅ Add this
}) {
  return (
    <Card
      className="w-full max-w-sm mx-auto cursor-pointer"
      onClick={() => handleViewDetails?.(car)} // ✅ Call handler on click
    >
      <div className="relative">
        <img
          src={car?.image[0]}
          alt={car?.title}
          className="w-full h-[250px] object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <h2 className="mt-2 mb-1 text-xl font-bold">{car?.title}</h2>
        <p className="text-sm truncate text-muted-foreground">
          {car?.description}
        </p>
        <div className="flex justify-between mt-2 text-sm">
          <span>Brand: {car?.brand}</span>
          <span>Year: {car?.year}</span>
        </div>
        <div className="flex justify-between mt-1 text-lg font-semibold">
          <span>${car?.price}</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(car?._id);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminCarSellTile;
