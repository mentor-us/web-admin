/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addCheckedProp } from "utils";

import groupDetailServices from "service/groupDetailServices";
import groupsServices from "service/groupsServices";

const columnHeaders = [
  { text: "Email", textValue: "email", isShow: true },
  { text: "Họ tên", textValue: "name", isShow: true }
];

const initialState = {
  status: "idle",
  data: {},
  mentors: [],
  mentees: [],
  isSelectMentorAll: false,
  isSelectMenteeAll: false,

  columnHeadersMentee: columnHeaders,
  columnHeadersMentor: columnHeaders,
  error: null
};

export const getGroup = createAsyncThunk("groupDetail/getGroup", async (id) => {
  const response = await groupDetailServices.getGroup(id);
  return addCheckedProp(response);
});

export const addMember = createAsyncThunk("groupDetail/addMember", async ({ id, req, type }) => {
  const response = await groupDetailServices.addMember(id, req, type);
  return addCheckedProp(response);
});

export const setRoleMember = createAsyncThunk(
  "groupDetail/setRoleMember",
  async ({ idGroup, idUser, type }) => {
    const response = await groupDetailServices.setRoleMember(idGroup, idUser, type);
    return addCheckedProp(response);
  }
);

export const deleteDetail = createAsyncThunk(
  "groupDetail/deleteDetail",
  async ({ idGroup, idUser, type }) => {
    const response = await groupDetailServices.deleteDetail(idGroup, idUser, type);
    return response;
  }
);

export const editDetail = createAsyncThunk("groupDetail/editDetail", async ({ id, req }) => {
  const response = await groupsServices.editGroup(id, req);
  return response;
});

export const disableGroupDetail = createAsyncThunk("accounts/disableGroupDetail", async (req) => {
  const response = await groupsServices.disableGroup(req);
  return response[0];
});

export const enableGroupDetail = createAsyncThunk("accounts/enableGroupDetail", async (req) => {
  const response = await groupsServices.enableGroup(req);
  return response[0];
});
const groupDetailSlice = createSlice({
  name: "groupDetail",
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
    getMentors: (state, action) => {
      state.mentors = action.payload;
    },
    getMentees: (state, action) => {
      state.mentees = action.payload;
    },
    updateGroupDetailColumnHeadersMentee: (state, action) => {
      const currentColumn = state.columnHeadersMentee.find(
        (item) => item.textValue === action.payload.textValue
      );
      Object.assign(currentColumn, { isShow: !currentColumn.isShow });
    },
    updateGroupDetailColumnHeadersMentor: (state, action) => {
      const currentColumn = state.columnHeadersMentor.find(
        (item) => item.textValue === action.payload.textValue
      );
      Object.assign(currentColumn, { isShow: !currentColumn.isShow });
    },
    resetState: (state, action) => {
      state.data = {};
      state.mentors = [];
      state.mentees = [];
      state.isSelectMentorAll = false;
      state.isSelectMenteeAll = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = {};
        state.data = { ...action.payload };
        state.isSelectMenteeAll = false;
        state.isSelectMentorAll = false;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
        state.isSelectMenteeAll = false;
        state.isSelectMentorAll = false;
      })
      .addCase(setRoleMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
        state.isSelectMenteeAll = false;
        state.isSelectMentorAll = false;
      })
      .addCase(deleteDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(editDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(disableGroupDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(enableGroupDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      });
  }
});

export const {
  getMentees,
  getMentors,
  resetState,
  updateGroupDetailColumnHeadersMentor,
  updateGroupDetailColumnHeadersMentee
} = groupDetailSlice.actions;

export default groupDetailSlice;
