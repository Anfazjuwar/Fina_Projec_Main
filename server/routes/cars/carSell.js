const express = require("express");
const {
  addCarSell,
  fetchAllCarsSell,
  deleteSellCar,
  handleImageUpload,
} = require("../../controllers/Cars/Car-Sell");
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addCarSell);
router.get("/get", fetchAllCarsSell);
// router.put("/update-cart", );
router.delete("/delete/:id", deleteSellCar); // ✅ correct

module.exports = router;
