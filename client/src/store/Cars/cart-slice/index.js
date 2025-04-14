import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  carCartItems: [],
  isLoading: false,
};

export const addToCarCart = createAsyncThunk(
  "carCart/addToCarCart",
  async ({ userId, carId, quantity }) => {
    const response = await axios.post(
      "http://localhost:5000/api/car/cart/add",
      {
        userId,
        carId, // ✅ NOT productId
        quantity,
      }
    );
    return response.data;
  }
);

export const fetchCarCartItems = createAsyncThunk(
  "carCart/fetchCarCartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/car/cart/get/${userId}`
    );
    return response.data;
  }
);

export const deleteCarCartItem = createAsyncThunk(
  "carCart/deleteCarCartItem",
  async ({ userId, carId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/car/cart/${userId}/${carId}`
    );
    return response.data;
  }
);

export const updateCarCartQuantity = createAsyncThunk(
  "carCart/updateCarCartQuantity",
  async ({ userId, carId, quantity }) => {
    const response = await axios.put(
      "http://localhost:5000/api/car/cart/update-cart",
      {
        userId,
        carId,
        quantity,
      }
    );
    return response.data;
  }
);

const carCartSlice = createSlice({
  name: "carCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCarCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCarCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carCartItems = action.payload.data;
      })
      .addCase(addToCarCart.rejected, (state) => {
        state.isLoading = false;
        state.carCartItems = [];
      })
      .addCase(fetchCarCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCarCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carCartItems = action.payload.data;
      })
      .addCase(fetchCarCartItems.rejected, (state) => {
        state.isLoading = false;
        state.carCartItems = [];
      })
      .addCase(updateCarCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCarCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carCartItems = action.payload.data;
      })
      .addCase(updateCarCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.carCartItems = [];
      })
      .addCase(deleteCarCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCarCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carCartItems = action.payload.data;
      })
      .addCase(deleteCarCartItem.rejected, (state) => {
        state.isLoading = false;
        state.carCartItems = [];
      });
  },
});

export default carCartSlice.reducer;
