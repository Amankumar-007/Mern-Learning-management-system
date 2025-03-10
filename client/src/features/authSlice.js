import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Load user from localStorage when the app starts
const savedUser = JSON.parse(localStorage.getItem("user")) || null;

export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });

    if (!response.data || !response.data.user) {
      throw new Error("Invalid user data received");
    }

    const { user, token } = response.data;

    // Store only relevant user data in localStorage
    localStorage.setItem("user", JSON.stringify({ ...user, token }));

    return { ...user, token };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});



export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth; // Get user from Redux state
      if (!user || !user.token) throw new Error("No token found");

      const response = await axios.get(`http://localhost:5000/api/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Send token in headers
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error("Failed to fetch profile:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user profile");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: { user: savedUser, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove user from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store user profile in state
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
  

export const { logout } = authSlice.actions;
export default authSlice.reducer;
