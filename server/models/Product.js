const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: [String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      default: 0, // optional: if not provided
    },
    totalStock: {
      type: Number,
      required: true,
    },
    averageReview: {
      type: Number,
      default: 0, // ✅ ADD DEFAULT VALUE
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
