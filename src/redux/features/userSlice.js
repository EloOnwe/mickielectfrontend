import Axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendApiUrl = import.meta.env.VITE_APP_BACKEND_URL;

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        backendApiUrl + "/api/createuser",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data.error || "User already exists", // Store only error message
        status: error.response?.status,
      });
    }
  }
);

//Logging in a user

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Axios.post(backendApiUrl + "/api/login", data);
      return res.data.user;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data || "User is not logged in", // Store only error message
      });
    }
  }
);

//Checking user login status

export const loginStatus = createAsyncThunk(
  "user/loginStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(backendApiUrl + "/api/loginstatus");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data || "User is not logged in", // Store only error message
      });
    }
  }
);

//Logout a user

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Axios.get(backendApiUrl + "/api/logout");
      return res.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data || "User is not logged in", // Store only error message
      });
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(backendApiUrl + "/api/user");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data || "User is not logged in", // Store only error message
      });
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isLoggedIn: false,
  isLoggedOut: true,
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.isLoggedOut = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.isError = true;
        state.isLoggedOut = true;
        state.isLoggedIn = false;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Logged in successfully";
        state.isLoggedOut = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    builder
      .addCase(loginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedOut = false;
      })
      .addCase(loginStatus.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.isLoggedOut = true;
      });
    builder
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedOut = false;
      })
      .addCase(getSingleUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.isLoggedOut = true;
      });
    builder
      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedOut = true;
        state.message = action.payload;
      })
      .addCase(logOutUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = true;
        state.isLoggedOut = false;
      });
  },
});

export const { resetState } = userSlice.actions;

export default userSlice.reducer;
