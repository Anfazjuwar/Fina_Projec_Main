import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter } from "../../ui/card";

function AdminCarTile({
  car,
  setFormData,
  setOpenCreateCarsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => console.log("View car details", car._id)}>
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
            {car?.salePrice > 0 && (
              <span className="text-red-600">${car?.salePrice}</span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="flex items-center justify-between">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setOpenCreateCarsDialog(true);
            setCurrentEditedId(car?._id);
            setFormData(car);
          }}
        >
          Edit
        </Button>
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

export default AdminCarTile;
