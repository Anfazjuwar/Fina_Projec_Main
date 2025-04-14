const express = require("express");

const {} = require("../../controllers/shop/address-controller");
const {
  addAddressCars,
  fetchAllAddressCars,
  deleteAddressCars,
  editAddresscars,
} = require("../../controllers/Cars/addressCar-controller");

const router = express.Router();

router.post("/add", addAddressCars);
router.get("/get/:userId", fetchAllAddressCars);
router.delete("/delete/:userId/:addressId", deleteAddressCars);
router.put("/update/:userId/:addressId", editAddresscars);

module.exports = router;
