import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import accountServices from "service/accountServices";

const initialState = {
  status: "idle",
  data: {},
  error: null
};

export const getMyInfo = createAsyncThunk("myInfo/get", async () => {
  const response = await accountServices.getMe();
  return response?.data;
});

const myInfoSlice = createSlice({
  name: "myInfo",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "succeeded";
      state.data = {};
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
  }
});

export const { logout } = myInfoSlice.actions;
export * from "./selector";
export default myInfoSlice;
