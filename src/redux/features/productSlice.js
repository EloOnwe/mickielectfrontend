import Axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendApiUrl = import.meta.env.VITE_APP_BACKEND_URL;

// To create a product

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (values, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        backendApiUrl + "/api/createproduct",
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.error || "Product already exists", // Store only error message
        status: error.response?.status,
      });
    }
  }
);

// To get all products

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(backendApiUrl + "/api/products");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        err: error.code,
        message: "Check your internet connection",
      });
    }
  }
);

// Get single product

export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Axios.get(backendApiUrl + `/api/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.error || "Product already exists", // Store only error message
        status: error.response?.status,
      });
    }
  }
);

//update product
export const updateProductData = createAsyncThunk(
  "product/updateUserData",
  async (values, { rejectWithValue }) => {
    const {
      name,
      category,
      brand,
      color,
      quantity,
      sold,
      regularPrice,
      price,
      description,
      image,
      ratings,
    } = values;

    try {
      const response = await Axios.put(
        `${backendApiUrl}/api/updateproduct/${values._id}`, // Better URL construction with template literals
        {
          name,
          category,
          brand,
          color,
          quantity,
          sold,
          regularPrice,
          price,
          description,
          image,
          ratings,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);

      // Ensure we handle cases where error.response is undefined
      const errMessage = error.response?.data?.error || "Product not updated";
      const errStatus = error.response?.status || 500; // Default to 500 if no response status

      return rejectWithValue({
        message: errMessage, // More readable error message handling
        status: errStatus,
      });
    }
  }
);

//Delete a product

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(backendApiUrl + `/api/delete/${id}`);
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
  products: null,
  product: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.message = "Product created";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
      });
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.message = "successful";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
      });
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.message = "successful";
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
      });
    builder
      .addCase(updateProductData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateProductData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.message = "update Successful";
      })
      .addCase(updateProductData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default productSlice.reducer;
