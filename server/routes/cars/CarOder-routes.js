const express = require("express");

const {
  createCarOrder,
  captureCarPayment,
  getAllCarOrdersByUser,
  getCarOrderDetails,
} = require("../../controllers/Cars/cars-order-controller");

const router = express.Router();

router.post("/create", createCarOrder);
router.post("/capture", captureCarPayment);
router.get("/list/:userId", getAllCarOrdersByUser);
router.get("/details/:id", getCarOrderDetails);

module.exports = router;
