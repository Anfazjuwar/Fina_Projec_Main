import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  carOrderList: [],
  carOrderDetails: null,
  isLoading: false,
};

export const getAllCarOrdersForAdmin = createAsyncThunk(
  "/carOrder/getAllCarOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/car/orders/get`
    );
    return response.data;
  }
);

export const getCarOrderDetailsForAdmin = createAsyncThunk(
  "/carOrder/getCarOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/car/orders/details/${id}`
    );
    return response.data;
  }
);

export const updateCarOrderStatusForAdmin = createAsyncThunk(
  "/carOrder/updateCarOrderStatusForAdmin",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/car/orders/update/${id}`,
      {
        orderStatus,
      }
    );
    return response.data;
  }
);

const adminCarOrderSlice = createSlice({
  name: "adminCarOrderSlice",
  initialState,
  reducers: {
    resetCarOrderDetails: (state) => {
      state.carOrderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCarOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carOrderList = action.payload.data;
      })
      .addCase(getAllCarOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.carOrderList = [];
      })
      .addCase(getCarOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carOrderDetails = action.payload.data;
      })
      .addCase(getCarOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.carOrderDetails = null;
      });
  },
});

export const { resetCarOrderDetails } = adminCarOrderSlice.actions;

export default adminCarOrderSlice.reducer;
