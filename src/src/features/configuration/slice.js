/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import configurationServices from "service/configurationServices";
import { emailDomainsValid } from "utils/constants";

/**
 * @typedef {Object} SystemConfiguration
 * @property {string} id - ID of configuration
 * @property {string} name - Name at of configuration
 * @property {string} description - Description of configuration
 * @property {string} key - Key of configuration (unique) - used to map to state
 * @property {object} value - Value of configuration
 */

/**
 * @typedef {Object} ConfigurationState
 * @property {string} status - Status of configuration
 * @property {SystemConfiguration} fromToRange - Max  configuration
 * @property {SystemConfiguration} emailDomainsValid - Email domains valid configuration
 * @property {SystemConfiguration} maxLearningYear - Max year for student to learn configuration
 */

/** @type {ConfigurationState} */
const initialState = {
  status: "idle",
  fromToRange: { value: 7, description: "" },
  emailDomainsValid: { value: emailDomainsValid, description: "" },
  maxLearningYear: { value: 7, description: "" }
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

/**
 * @deprecated since version 0.1.1 - use `updateMaxLearningYearConfiguration` instead (same function)
 */
export const updateFromToRangeConfiguration = createAsyncThunk(
  "configuration/updateFromToRangeConfiguration",
  async ({ id, req }) => {
    const response = await configurationServices.updateConfiguration(id, req);
    return response;
  }
);

/**
 * @since version 0.1.1
 */
export const updateMaxLearningYearConfiguration = createAsyncThunk(
  "configuration/updateMaxLearningYearConfiguration",
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
      .addCase(getAllConfiguration.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllConfiguration.rejected, (state, action) => {
        state.status = "failure";
      })
      .addCase(getAllConfiguration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fromToRange = action.payload.fromToRange;
        state.emailDomainsValid = action.payload.emailDomainsValid;
        state.maxLearningYear = action.payload.maxLearningYear;
      })
      .addCase(updateDomainConfiguration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.emailDomainsValid = action.payload;
      })
      .addCase(updateFromToRangeConfiguration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fromToRange = action.payload;
      })
      .addCase(updateMaxLearningYearConfiguration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.maxLearningYear = action.payload;
      })
});

export default configurationSlice;
