import CarsImageUpload from "@/components/admin-view/Cars/CarsImageUpload";
import AdminCarTile from "@/components/admin-view/Cars/cartitle";
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addCarFormElements, addProductFormElements } from "@/config";
import {
  addNewCar,
  deleteCar,
  editCar,
  fetchAllCars,
} from "@/store/admin/carProSilce";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: [],
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  year: "",
  fuelType: "",
  transmission: "",
  mileage: "",
  color: "",
  engineCapacity: "",
  horsepower: "",
  seatingCapacity: "",
  safetyRating: "",
  airConditioning: false,
  powerSteering: false,
  airbags: "",
  rearCamera: false,
  parkingSensors: false,
  sunroof: false,
  bluetooth: false,
  alloyWheels: false,
  isFeatured: false,
  isAvailable: true,
  averageReview: 0,
};

function Admincars() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { carList } = useSelector((state) => state.adminCars);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editCar({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllCars());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            toast({
              title: "Product edited successfully",
            });
          }
        })
      : dispatch(
          addNewCar({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllCars());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product add successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteCar(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllCars());
        toast({
          title: "Product Deleted successfully",
        });
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  console.log(formData, "carList");

  return (
    <Fragment>
      <div className="flex justify-end w-full mb-5">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Car
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {carList && carList.length > 0
          ? carList.map((carItem) => (
              <AdminCarTile
                setFormData={setFormData}
                setOpenCreateCarsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                car={carItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <CarsImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addCarFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default Admincars;
