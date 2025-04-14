const express = require("express");

const {
  getAllCarReservations,
  getCarReservationDetails,
  updateCarReservationStatus,
} = require("../../controllers/admin/ordercar");

const router = express.Router();

router.get("/get", getAllCarReservations);
router.get("/details/:id", getCarReservationDetails);
router.put("/update/:id", updateCarReservationStatus);

module.exports = router;
