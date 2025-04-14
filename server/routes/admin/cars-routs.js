const express = require("express");

const { upload } = require("../../helpers/cloudinary");
const {
  handleImageUpload,
  addCar,
  editCar,
  deleteCar,
  fetchAllCars,
} = require("../../controllers/admin/carsProducts");
const {
  createCarReservation,
  getAllCarReservations,
  getCarReservationDetails,
  updateCarReservationStatus,
} = require("../../controllers/admin/ordercar");

const router = express.Router();

// Upload car image (single)
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

// Add new car
router.post("/add", addCar);

// Edit car
router.put("/edit/:id", editCar);

// Delete car
router.delete("/delete/:id", deleteCar);

// Get all cars
router.get("/get", fetchAllCars);

//car order

// router.post("/create", createCarReservation);
router.get("/all", getAllCarReservations);
router.get("/details/:id", getCarReservationDetails);
router.put("/update/:id", updateCarReservationStatus);

module.exports = router;
