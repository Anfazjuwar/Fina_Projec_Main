import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import axios from "axios";
import { Skeleton } from "../../ui/skeleton";

function CarsImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  const images = Array.isArray(imageFile) ? imageFile : [];

  function handleImageFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    const totalFiles = [...images, ...selectedFiles].slice(0, 10); // limit 10
    setImageFile(totalFiles);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const totalFiles = [...images, ...droppedFiles].slice(0, 10);
    setImageFile(totalFiles);
  }

  function handleRemoveImage(index) {
    const updatedFiles = [...images];
    updatedFiles.splice(index, 1);
    setImageFile(updatedFiles);
    if (updatedFiles.length === 0 && inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImagesToCloudinary() {
    setImageLoadingState(true);
    const uploadedUrls = [];

    for (const file of images) {
      const formData = new FormData();
      formData.append("my_file", file);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/cars/upload-image",
          formData
        );
        if (response?.data?.success) {
          uploadedUrls.push(response.data.result.url);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }

    setUploadedImageUrl(uploadedUrls); // Save all image URLs
    setImageLoadingState(false);
  }

  useEffect(() => {
    if (images.length > 0) uploadImagesToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="block mb-2 text-lg font-semibold">
        Upload Images (max 10)
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 ${
          isEditMode ? "opacity-60" : ""
        }`}
      >
        <Input
          id="image-upload"
          type="file"
          multiple
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {images.length === 0 ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer ${
              isEditMode ? "cursor-not-allowed" : ""
            }`}
          >
            <UploadCloudIcon className="w-10 h-10 mb-2 text-muted-foreground" />
            <span>Drag & drop or click to upload images</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex flex-col gap-2">
            {images.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <FileIcon className="w-6 h-6 mr-2 text-primary" />
                  <p className="max-w-xs text-sm font-medium truncate">
                    {file.name}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveImage(index)}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            ))}
            {images.length < 10 && (
              <Button
                variant="outline"
                onClick={() => inputRef.current?.click()}
                className="mt-2"
              >
                Add More Images
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CarsImageUpload;
