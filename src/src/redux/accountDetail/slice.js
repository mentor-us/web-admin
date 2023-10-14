/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addCheckedProp } from "utils";

import accountServices from "service/accountServices";

const columnHeaders = [
  { text: "Tên nhóm", textValue: "name", isShow: true },
  { text: "Loại nhóm", textValue: "groupCategory", isShow: true }
];

const initialState = {
  status: "idle",
  data: {},
  columnHeadersMentee: columnHeaders,
  columnHeadersMentor: columnHeaders,
  error: null
};

export const getAccountDetail = createAsyncThunk("accountDetail/getAccountDetail", async (id) => {
  const response = await accountServices.getAccountDetail(id);
  return addCheckedProp(response);
});

export const editAccountDetail = createAsyncThunk(
  "accounts/editAccountDetail",
  async ({ id, req }) => {
    const response = await accountServices.editAccount(id, req);
    return response;
  }
);

export const disableAccountDetail = createAsyncThunk(
  "accounts/disableAccountDetail",
  async (req) => {
    const response = await accountServices.disableAccount(req);
    return response[0];
  }
);

export const enableAccountDetail = createAsyncThunk("accounts/enableAccountDetail", async (req) => {
  const response = await accountServices.enableAccount(req);
  return response[0];
});

const accountDetailSlice = createSlice({
  name: "accountDetail",
  initialState,
  reducers: {
    // mentorDetailCheckboxAllChange: (state, action) => {
    //   state.data = state.data.map((item) => ({ ...item, isChecked: !state.isSelectAll }));
    //   state.isSelectAll = !state.isSelectAll;
    // },
    groupCheckboxSingleChange: (state, action) => {
      const currentAccount = state.data.find((item) => item.id === action.payload.id);
      Object.assign(currentAccount, { isChecked: !currentAccount.isChecked });
    },
    updateAccountDetailColumnHeadersMentee: (state, action) => {
      const currentColumn = state.columnHeadersMentee.find(
        (item) => item.textValue === action.payload.textValue
      );
      Object.assign(currentColumn, { isShow: !currentColumn.isShow });
    },
    updateAccountDetailColumnHeadersMentor: (state, action) => {
      const currentColumn = state.columnHeadersMentor.find(
        (item) => item.textValue === action.payload.textValue
      );
      Object.assign(currentColumn, { isShow: !currentColumn.isShow });
    },
    resetState: (state, action) => {
      state.data = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccountDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(editAccountDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = { ...state.data, ...action.payload };
        state.error = null;
      })
      .addCase(disableAccountDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = { ...state.data, ...action.payload };
      })
      .addCase(enableAccountDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = { ...state.data, ...action.payload };
      });
  }
});

export const {
  resetState,
  updateAccountDetailColumnHeadersMentor,
  updateAccountDetailColumnHeadersMentee
} = accountDetailSlice.actions;

export default accountDetailSlice;
