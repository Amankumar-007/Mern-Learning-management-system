import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};
const authSlice = createSlice({
    name: "auth",
  initialState,
  reducers: {
    userLoggedIn(state, action) {
        state.isAuthenticated = true;
      state.user = action.payload.user;},
      userLoggedOut(state) {
        state.isAuthenticated = false;
        state.user = null;
      },
  },});

  export const { userLoggedIn, userLoggedOut } = authSlice.actions;
  export default authSlice.reducer;
