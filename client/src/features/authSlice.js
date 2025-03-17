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


export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ name, profilePhoto }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;

      if (!user || !user.token) {
        console.error("❌ No token found in Redux state.");
        throw new Error("No token found");
      }

      const formData = new FormData();
      formData.append("name", name);
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      console.log("🔹 Sending update request to backend...");

      const response = await axios.put(
        `${API_URL}/${user._id}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // ✅ Ensure token is included
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Update request successful. Fetching updated user data...");

      // ✅ Fetch updated user profile from MongoDB Atlas
      const updatedProfile = await axios.get(`${API_URL}/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      console.log("✅ Updated user profile fetched:", updatedProfile.data);

      // ✅ Store updated user in `localStorage`
      localStorage.setItem("user", JSON.stringify(updatedProfile.data));

      return updatedProfile.data;
    } catch (error) {
      console.error("❌ Update failed:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: savedUser, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // ✅ Remove token on logout
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
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Update localStorage
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
  

export const { logout } = authSlice.actions;
export default authSlice.reducer;
