import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: "",
    profileImage: ''
  },
  reducers: {
    login(state, action) {
      const { token, user, profileImage } = action.payload;
      if (token !== null && token !== undefined) {
        state.isLoggedIn = true;
        state.user = user;
        state.profileImage = profileImage;
      }
    },
    logout(state, action) {
      localStorage.removeItem("token");
      localStorage.removeItem("Name");
      localStorage.removeItem("proimg");
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
