const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminOrderCarRouter = require("./routes/admin/CarOrderRoute");
const chatRoutes = require("./routes/openAi/Ai");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const carRoutes = require("./routes/admin/cars-routs");
const carFillterRoutes = require("./routes/cars/FillterCar");
const CarsAddressRouter = require("./routes/cars/address-routes");
const PublicReviewRouter = require("./routes/cars/review");
const carOrderRouter = require("./routes/cars/CarOder-routes");
const carCartRouter = require("./routes/cars/cart-routers");

const CardSellRouter = require("./routes/cars/carSell");

const commonFeatureRouter = require("./routes/common/feature-routes");
const dbConnection = require("./dbConfig");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

dbConnection();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// if (error.message) {
//   console.error("Error connecting to MongoDB:", error.message);
//   // Optionally, you can log the error stack for more details
//   console.error("Error stack:", error.stack);
//   // Exit the process with a non-zero status code
//   // to indicate that the application failed to start
//   // This is useful in production environments
//   // where you want to ensure that the application doesn't run
//   // if the database connection fails
//   // process.exit(1);
//   // Uncomment the line below if you want to exit the process

//   process.exit(1);
// }

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);
// cars
app.use("/api/cars", carFillterRoutes);
app.use("/api/cars/address", CarsAddressRouter);

app.use("/api/car/review", PublicReviewRouter);
app.use("/api/car/order", carOrderRouter);
app.use("/api/car/cart", carCartRouter);
app.use("/api/car/sell", CardSellRouter);

//cqars admin
app.use("/api/admin/cars", carRoutes);
app.use("/api/admin/car/orders", adminOrderCarRouter);

// OpenAI routes

app.use("/api/ai", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
