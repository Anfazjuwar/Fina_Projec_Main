const mongoose = require("mongoose");

const OrderCarSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: [String],
      price: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,

  // 👇 Add this field for TTL
  reservationDate: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 15, // 15 days in seconds
  },
});

module.exports = mongoose.model("Orders", OrderCarSchema);
