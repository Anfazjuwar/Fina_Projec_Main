const mongoose = require("mongoose");

const PublicReviewSchema = new mongoose.Schema(
  {
    targetType: {
      type: String, // e.g., 'car', 'carCompany', 'service'
      required: true,
    },
    targetId: {
      type: String, // ID or name of the target
      required: true,
    },
    reviewerName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null means anonymous
    },
    reviewMessage: {
      type: String,
      required: true,
    },
    reviewValue: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PublicReview", PublicReviewSchema);
