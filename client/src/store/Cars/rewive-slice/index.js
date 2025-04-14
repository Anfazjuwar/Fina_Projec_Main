import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addCarReview = createAsyncThunk(
  "/carReview/addCarReview",
  async (formData) => {
    const response = await axios.post(
      `http://localhost:5000/api/car/review/add`,
      formData
    );
    return response.data;
  }
);

export const getCarReviews = createAsyncThunk(
  "/carReview/getCarReviews",
  async ({ targetType, targetId }) => {
    const response = await axios.get(
      `http://localhost:5000/api/car/review/get`,
      {
        params: {
          targetType,
          targetId,
        },
      }
    );
    return response.data;
  }
);

const carReviewSlice = createSlice({
  name: "carReviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getCarReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default carReviewSlice.reducer;
