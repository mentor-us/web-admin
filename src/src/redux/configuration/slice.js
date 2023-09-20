/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { emailDomainsValid } from "utils/constants";
import configurationServices from "service/configurationServices";

const initialState = {
  status: "idle",
  fromToRange: { value: 7, description: "" },
  emailDomainsValid: { value: emailDomainsValid, description: "" }
};

export const getAllConfiguration = createAsyncThunk(
  "configuration/getAllConfiguration",
  async () => {
    const response = await configurationServices.getAllConfiguration();
    return response;
  }
);

export const updateDomainConfiguration = createAsyncThunk(
  "configuration/updateDomainConfiguration",
  async ({ id, req }) => {
    const response = await configurationServices.updateConfiguration(id, req);
    return response;
  }
);

export const updateFromToRangeConfiguration = createAsyncThunk(
  "configuration/updateFromToRangeConfiguration",
  async ({ id, req }) => {
    const response = await configurationServices.updateConfiguration(id, req);
    return response;
  }
);

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {},
  extraReducers: (builders) =>
    builders
      .addCase(getAllConfiguration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fromToRange = action.payload.fromToRange;
        state.emailDomainsValid = action.payload.emailDomainsValid;
      })
      .addCase(updateDomainConfiguration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.emailDomainsValid = action.payload;
      })
      .addCase(updateFromToRangeConfiguration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fromToRange = action.payload;
      })
});

export default configurationSlice;
