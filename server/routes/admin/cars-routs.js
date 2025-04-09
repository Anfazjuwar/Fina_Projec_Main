const express = require("express");

const { upload } = require("../../helpers/cloudinary");
const {
  handleImageUpload,
  addCar,
  editCar,
  deleteCar,
  fetchAllCars,
} = require("../../controllers/admin/carsProducts");

const router = express.Router();

// Upload car image (single)
router.post("/upload-image", upload.single("myfile"), handleImageUpload);

// Add new car
router.post("/add", addCar);

// Edit car
router.put("/edit/:id", editCar);

// Delete car
router.delete("/delete/:id", deleteCar);

// Get all cars
router.get("/get", fetchAllCars);

module.exports = router;
