import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getCarSearchResults = createAsyncThunk(
  "/cars/getSearchResults",
  async (keyword) => {
    const response = await axios.get(
      `http://localhost:5000/api/car/search/${keyword}`
    );

    return response.data;
  }
);

const carSearchSlice = createSlice({
  name: "carSearch",
  initialState,
  reducers: {
    resetCarSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getCarSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetCarSearchResults } = carSearchSlice.actions;

export default carSearchSlice.reducer;
