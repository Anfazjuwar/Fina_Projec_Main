import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  carList: [],
  carDetails: null,
};

// Fetch all cars with filters
export const fetchAllFilteredCars = createAsyncThunk(
  "/cars/fetchAllCars",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:5000/api/cars/get?${query}`
    );

    return result?.data;
  }
);

// Get single car details
export const fetchCarDetails = createAsyncThunk(
  "/cars/fetchCarDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/cars/details/${id}`
    );

    return result?.data;
  }
);

const carSlice = createSlice({
  name: "shopCars",
  initialState,
  reducers: {
    setCarDetails: (state) => {
      state.carDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carList = action.payload.data;
      })
      .addCase(fetchAllFilteredCars.rejected, (state) => {
        state.isLoading = false;
        state.carList = [];
      })
      .addCase(fetchCarDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCarDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carDetails = action.payload.data;
      })
      .addCase(fetchCarDetails.rejected, (state) => {
        state.isLoading = false;
        state.carDetails = null;
      });
  },
});

export const { setCarDetails } = carSlice.actions;
export default carSlice.reducer;
