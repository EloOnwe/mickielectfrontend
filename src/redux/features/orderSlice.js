import Axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendApiUrl = import.meta.env.VITE_APP_BACKEND_URL;

// To get orders

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(backendApiUrl + "/api/order");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.error || "Product already exists", // Store only error message
        status: error.response?.status,
      });
    }
  }
);

const initialState = {
  orders: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
      });
  },
});

export default orderSlice.reducer;
