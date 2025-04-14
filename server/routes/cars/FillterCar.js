const express = require("express");
const {
  getFilteredCars,
  getCarDetails,
} = require("../../controllers/Cars/filter");
const router = express.Router();

router.get("/get", getFilteredCars);
router.get("/details/:id", getCarDetails);

module.exports = router;
