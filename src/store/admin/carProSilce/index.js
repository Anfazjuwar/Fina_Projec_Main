import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  carList: [],
};

// Add New Car
export const addNewCar = createAsyncThunk(
  "/cars/addNewCar",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/cars/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

// Fetch All Cars
export const fetchAllCars = createAsyncThunk("/cars/fetchAllCars", async () => {
  const result = await axios.get("http://localhost:5000/api/admin/cars/get");
  return result?.data;
});

// Edit Car
export const editCar = createAsyncThunk(
  "/cars/editCar",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/cars/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

// Delete Car
export const deleteCar = createAsyncThunk("/cars/deleteCar", async (id) => {
  const result = await axios.delete(
    `http://localhost:5000/api/admin/cars/delete/${id}`
  );
  return result?.data;
});

const AdminCarsSlice = createSlice({
  name: "adminCars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carList = action.payload.data;
      })
      .addCase(fetchAllCars.rejected, (state) => {
        state.isLoading = false;
        state.carList = [];
      });
  },
});

export default AdminCarsSlice.reducer;
