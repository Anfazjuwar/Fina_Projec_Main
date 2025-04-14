const express = require("express");

const {
  addToCarCart,
  fetchCarCartItems,
  updateCarCartItemQty,
  deleteCarCartItem,
} = require("../../controllers/Cars/cartCars-controller");

const router = express.Router();

router.post("/add", addToCarCart);
router.get("/get/:userId", fetchCarCartItems);
router.put("/update-cart", updateCarCartItemQty);

router.delete("/:userId/:carId", deleteCarCartItem); // ✅ correct

module.exports = router;
