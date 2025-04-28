import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function CarTile({ car, handleGetProductDetails, handleAddtoCart }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(car?._id)}>
        <div className="relative">
          <img
            src={car?.image?.[0] || "/fallback.jpg"}
            alt={car?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {/* {car?.totalStock === 0 ? (
            <Badge className="absolute bg-red-500 top-2 left-2 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : car?.totalStock < 10 ? (
            <Badge className="absolute bg-red-500 top-2 left-2 hover:bg-red-600">
              {`Only ${car?.totalStock} left`}
            </Badge>
          ) : car?.salePrice > 0 ? (
            <Badge className="absolute bg-red-500 top-2 left-2 hover:bg-red-600">
              Sale
            </Badge>
          ) : null} */}
        </div>
        <CardContent className="p-4">
          <h2 className="mb-2 text-xl font-bold">{car?.title}</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[car?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[car?.brand]}
            </span>
          </div>
          <div className="flex justify-between mt-1 text-lg font-semibold">
            <span>Booking ${car?.price}</span>

            <span className="">Total ${car?.salePrice}</span>
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {car?.totalStock === 0 ? (
          <Button className="w-full cursor-not-allowed opacity-60">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(car?._id, car?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default CarTile;
