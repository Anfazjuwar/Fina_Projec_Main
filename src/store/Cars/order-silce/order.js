import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createCarOrder = createAsyncThunk(
  "/carOrder/createCarOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:5000/api/car/order/create",
      orderData
    );
    return response.data;
  }
);

export const captureCarPayment = createAsyncThunk(
  "/carOrder/captureCarPayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      "http://localhost:5000/api/car/order/capture",
      {
        paymentId,
        payerId,
        orderId,
      }
    );
    return response.data;
  }
);

export const getAllCarOrdersByUser = createAsyncThunk(
  "/carOrder/getAllCarOrdersByUser",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/car/order/list/${userId}`
    );
    return response.data;
  }
);

export const getCarOrderDetails = createAsyncThunk(
  "/carOrder/getCarOrderDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/car/order/details/${id}`
    );
    return response.data;
  }
);

const carOrderSlice = createSlice({
  name: "carOrderSlice",
  initialState,
  reducers: {
    resetCarOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCarOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCarOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentCarOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createCarOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllCarOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCarOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllCarOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getCarOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getCarOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetCarOrderDetails } = carOrderSlice.actions;

export default carOrderSlice.reducer;
