import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
  "api/admin/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/users", {
        withCredentials: true,
      });
      return response.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
// ...existing imports
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ id, role }, thunkAPI) => {
    try {
      const response = await axios.put(
        `/api/admin/user/${id}`,
        { role },
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "api/admin/deleteUser",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/admin/user/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update user role
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u._id === action.payload._id);
        if (idx !== -1) state.users[idx] = action.payload;
      })

      // delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default adminUsersSlice.reducer;
export const selectAllUsers = (state) => state.adminUsers.users;
export const selectLoading = (state) => state.adminUsers.loading;
export const selectError = (state) => state.adminUsers.error;
