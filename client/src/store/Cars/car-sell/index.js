import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  carSellList: [],
  carDetails: null,
};

// Add New Car
export const addNewSellCar = createAsyncThunk(
  "/cars/addNewCar",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/car/sell/add",
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
export const fetchAllSellCars = createAsyncThunk(
  "/cars/fetchAllCars",
  async () => {
    const result = await axios.get("http://localhost:5000/api/car/sell/get");
    return result?.data;
  }
);

// // Edit Car
// export const editCar = createAsyncThunk(
//   "/cars/editCar",
//   async ({ id, formData }) => {
//     const result = await axios.put(
//       `http://localhost:5000/api/admin/cars/edit/${id}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return result?.data;
//   }
// );

// Delete Car
export const deleteSellCar = createAsyncThunk("/cars/deleteCar", async (id) => {
  const result = await axios.delete(
    `http://localhost:5000/api/car/sell/delete/${id}`
  );
  return result?.data;
});

const CarsSellSlice = createSlice({
  name: "SellCars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSellCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSellCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carSellList = action.payload.data;
      })
      .addCase(fetchAllSellCars.rejected, (state) => {
        state.isLoading = false;
        state.carSellList = [];
      });
  },
});

export default CarsSellSlice.reducer;
