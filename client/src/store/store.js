import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";
import admincarOrderSlice from "./admin/car-order-Slice";
import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice";
import adminCarsSlice from "./admin/carProSilce";
import shopCarsReducer from "./Cars/cars-slice";
import carCartSlice from "./Cars/cart-slice";
import CarsSellSlice from "./Cars/car-sell";
import carOrderSlice from "./Cars/order-silce/order";
import chatReducer from "./Chat/chat";
import CarSearchSlice from "./Cars/search-slice";
import adminUsersReducer from "./admin/authadmin-slider/admin";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminUsers: adminUsersReducer,
    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    adminCarOrder: admincarOrderSlice,
    adminCars: adminCarsSlice,
    shopCars: shopCarsReducer,

    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    carOrder: carOrderSlice,
    carSearch: CarSearchSlice,
    carCart: carCartSlice,
    carSell: CarsSellSlice,
    chat: chatReducer,

    commonFeature: commonFeatureSlice,
  },
});

export default store;
