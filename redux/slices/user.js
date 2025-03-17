'use client';

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: '1234',
  password: '1234',
  isAuthenticated: false,
}

const user = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    authenticate: (state, action) => {
      if (action.payload.userName === state.userName && action.payload.password === state.password) {
        state.isAuthenticated = true;
      }
    },
    changeUserInfo: (state, action) => {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    }
  },
});

const selectIsAuthenticated = (state) => state.user.isAuthenticated;
const selectUserName = (state) => state.user.userName;

export const { authenticate, changeUserInfo } = user.actions;
export { selectIsAuthenticated, selectUserName };
export default user.reducer;