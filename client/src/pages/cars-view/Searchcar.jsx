import CarProductDetailsDialog from "@/components/CarsShopping/car-details";
import CarTile from "@/components/CarsShopping/car-title";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { fetchCarDetails } from "@/store/Cars/cars-slice";

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
  const { toast } = useToast();

  useEffect(() => {
    if (keyword.trim().length > 3) {
      const timeout = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getCarSearchResults(keyword));
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetCarSearchResults());
    }
  }, [keyword]);

  function handleGetCarDetails(carId) {
    dispatch(fetchCarDetails(carId));
  }

  useEffect(() => {
    if (carDetails !== null) setOpenDetailsDialog(true);
  }, [carDetails]);

  return (
    <div className="container px-4 py-8 mx-auto md:px-6">
      <div className="flex justify-center mb-8">
        <div className="flex items-center w-full">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="py-6"
            placeholder="Search Cars by make, model, etc..."
          />
        </div>
      </div>

      {!searchResults.length && (
        <h1 className="text-5xl font-extrabold">No cars found!</h1>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searchResults.map((car) => (
          <CarTile
            key={car.id}
            car={car}
            onClickDetails={handleGetCarDetails}
          />
        ))}
      </div>

      <CarProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        carDetails={carDetails}
      />
    </div>
  );
}

export default SearchCars;
