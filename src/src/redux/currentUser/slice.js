/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

import accountServices from "service/accountServices";

const initialState = {
  status: "idle",
  data: {},
  error: null
};

export const getCurrentUserSlice = createAsyncThunk("currentUser/getCurrentUser", async () => {
  const token = localStorage.getItem("access_token");
  const decode = jwtDecode(token);
  const response = await accountServices.getAccountDetail(decode.sub);
  return response;
});

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.status = "succeeded";
      state.data = {};
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserSlice.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
  }
});

export const { logout } = currentUserSlice.actions;

export default currentUserSlice;
