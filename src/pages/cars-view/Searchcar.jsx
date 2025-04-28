import CarProductDetailsDialog from "@/components/CarsShopping/car-details";
import CarTile from "@/components/CarsShopping/car-title";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { fetchCarDetails } from "@/store/Cars/cars-slice";
import { addToCarCart, fetchCarCartItems } from "@/store/Cars/cart-slice";
import {
  getCarSearchResults,
  resetCarSearchResults,
} from "@/store/Cars/search-slice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchCars() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { searchResults } = useSelector((state) => state.carSearch);
  const { carDetails } = useSelector((state) => state.shopCars);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  // 1. Search for cars
  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      const timeout = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getCarSearchResults(keyword));
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetCarSearchResults());
    }
  }, [keyword, dispatch]);

  // 2. Add to cart
  function handleAddtoCart(carId, totalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.carId === carId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > totalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this car`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCarCart({
        userId: user?.id,
        carId: carId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCarCartItems(user?.id));
        toast({ title: "Car added to cart!" });
      }
    });
  }

  // 3. Get car details
  function handleGetProductDetails(carId) {
    console.log("Clicked car id:", carId);
    dispatch(fetchCarDetails(carId));
  }

  // 4. Open details dialog when carDetails is ready
  useEffect(() => {
    if (carDetails !== null) {
      console.log("Fetched carDetails:", carDetails);
      setOpenDetailsDialog(true);
    }
  }, [carDetails]);

  return (
    <div className="container px-4 py-8 mx-auto md:px-6">
      <div className="flex justify-center mb-8">
        <div className="flex items-center w-full">
          <Input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            className="py-6"
            placeholder="Search Cars by make, model, etc..."
          />
        </div>
      </div>

      {/* No results */}
      {!searchResults.length && (
        <h1 className="text-5xl font-extrabold">No cars found!</h1>
      )}

      {/* Car listings */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searchResults.map((car) => (
          <CarTile
            key={car.id || car._id}
            car={car}
            handleGetProductDetails={handleGetProductDetails}
            handleAddtoCart={handleAddtoCart}
          />
        ))}
      </div>

      {/* Car Details Dialog */}
      {carDetails && (
        <CarProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          carDetails={carDetails}
        />
      )}
    </div>
  );
}

export default SearchCars;
