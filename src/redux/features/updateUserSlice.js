import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Axios from "axios";
const backendApiUrl = import.meta.env.VITE_APP_BACKEND_URL;

const initialState = {
  isLoading: false,
  photo: null,
  username: "",
  phone: "",
  isError: false,
  message: "",
};

export const updatePhoto = createAsyncThunk(
  "updateUser/updatePhoto",
  async (photo, { rejectWithValue }) => {
    console.log("photo", photo);
    try {
      const response = await Axios.put(
        backendApiUrl + "/api/updateuserphoto",
        { photo: photo },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data.error || "User already exists", // Store only error message
        status: error.response?.status,
      });
    }
  }
);

//Updating the user information

export const updateUserData = createAsyncThunk(
  "updateUser/updateUserData",
  async (values, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        backendApiUrl + "/api/updateuser",
        { username: values.username, phone: values.phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data.error || "User already exists", // Store only error message
        status: error.response?.status,
      });
    }
  }
);

export const updateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePhoto.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePhoto.fulfilled, (state, action) => {
      state.isLoading = false;
      state.photo = action.payload;
      state.message = "successfully updated";
    });
    builder.addCase(updatePhoto.rejected, (state, action) => {
      state.isLoading = false;
      state.photo = null;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(updateUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.username = action.payload.username;
      state.phone = action.payload.phone;
      state.isError = false;
      state.message = "Successfully updated";
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export default updateUserSlice.reducer;
