import ProductImageUpload from "@/components/admin-view/image-upload";
import ProductImagefeUpload from "@/components/admin-view/Projectfeture";
import ProductImageFeUpload from "@/components/admin-view/Projectfeture";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDeleteImage(id) {
    dispatch(deleteFeatureImage(id)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getFeatureImages());
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div>
      <ProductImagefeUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="w-full mt-5">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList &&
          featureImageList.length > 0 &&
          featureImageList.map((featureImgItem) => (
            <div className="relative" key={featureImgItem._id}>
              <img
                src={featureImgItem.image}
                className="w-full h-[700px] object-cover rounded-t-lg"
              />
              <button
                onClick={() => handleDeleteImage(featureImgItem._id)}
                className="absolute px-2 py-1 text-white bg-red-500 rounded top-2 right-2"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
