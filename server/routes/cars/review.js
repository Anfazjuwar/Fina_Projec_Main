const express = require("express");
const {
  addPublicReview,
  getReviewsByTarget,
} = require("../../controllers/Cars/cars-rewiws");

const router = express.Router();

router.post("/add", addPublicReview);
router.get("/get", getReviewsByTarget);

module.exports = router;
