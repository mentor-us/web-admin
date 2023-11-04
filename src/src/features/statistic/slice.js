/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ITEMS_PER_PAGE } from "config";

import statisticServices from "service/statisticService";

const columnHeaders = [
  { text: "Tên nhóm", textValue: "name", isShow: true },
  { text: "Loại nhóm", textValue: "category", isShow: true },
  { text: "Trạng thái", textValue: "status", isShow: true },
  { text: "Tổng số mentee", textValue: "totalMentees", isShow: true },
  { text: "Tổng số mentor", textValue: "totalMentors", isShow: true },
  { text: "Tổng số tin nhắn", textValue: "totalMessages", isShow: true },
  { text: "Tổng số công việc", textValue: "totalTasks", isShow: true },
  { text: "Tổng số tin nhắn", textValue: "totalMeetings", isShow: true },
  { text: "Lần hoạt động gần nhất", textValue: "lastTimeActive", isShow: true }
];

const initialState = {
  status: "idle",
  dataGeneral: {
    activeGroups: 0,
    activeUsers: 0,
    totalGroups: 0,
    totalMeetings: 0,
    totalMessages: 0,
    totalTasks: 0,
    totalUsers: 0
  },
  isFirstLoad: true,
  totalPages: 1,
  currentPage: 1,
  totalItems: 0,
  itemsPerPage: parseInt(ITEMS_PER_PAGE, 10),
  dataByMonth: [],
  dataTable: [],
  isFilter: false,
  filterRequest: {},
  filterValue: "",

  isSearchByButton: false,
  dataSearch: [],
  isSearch: false,
  totalPagesSearch: 1,
  currentPageSearch: 1,
  totalItemsSearch: 0,
  searchRequest: {},

  columnHeaders,

  error: null
};

export const getGeneral = createAsyncThunk("statistic/getGeneral", async (req) => {
  const response = await statisticServices.getGeneral(req);
  return response;
});

export const getByMonth = createAsyncThunk("statistic/getByMonth", async (req) => {
  const response = await statisticServices.getByMonth(req);
  return response;
});

export const getGroupsStatisticTableData = createAsyncThunk(
  "statistic/getGroupsStatisticTableData",
  async (req) => {
    const response = await statisticServices.searchStatistic(req);

    return response;
  }
);

export const searchStatistic = createAsyncThunk("statistic/searchStatistic", async (req) => {
  const response = await statisticServices.searchStatistic(req);

  return response;
});

export const filterStatistic = createAsyncThunk("statistic/filterStatistic", async (req) => {
  const response = await statisticServices.searchStatistic(req);
  return response;
});

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    groupItemsPerPageChange: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    updateSearchRequest: (state, action) => {
      state.searchRequest = action.payload;
    },
    updateFilterRequest: (state, action) => {
      state.filterRequest = action.payload;
    },
    updateFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
    searchByButton: (state, action) => {
      state.isSearchByButton = action.payload;
    },
    updateStatisticColumnHeaders: (state, action) => {
      const currentColumn = state.columnHeaders.find(
        (item) => item.textValue === action.payload.textValue
      );
      Object.assign(currentColumn, { isShow: !currentColumn.isShow });
    },
    resetState: (state, action) => {
      state.isFirstLoad = true;
      state.totalPages = 1;
      state.currentPage = 1;
      state.totalItems = 0;
      state.isFilter = false;
      state.filterRequest = {};
      state.filterValue = "";

      state.totalPagesSearch = 1;
      state.currentPageSearch = 1;
      state.totalItemsSearch = 0;
      state.searchRequest = {};
      state.isSearchByButton = false;
      state.dataSearch = [];
      state.isSearch = false;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getGeneral.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataGeneral = action.payload;
      })

      .addCase(getByMonth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataByMonth = action.payload;
      })

      .addCase(getGroupsStatisticTableData.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.isFirstLoad) {
          state.isFirstLoad = false;
        }

        state.dataTable = action.payload.groups;
        state.currentPage = action.payload.currentPage + 1;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
        state.isSearch = false;
        state.dataSearch = [];
      })

      // Search statistic
      .addCase(searchStatistic.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.dataSearch = action.payload.groups;
        state.isSearch = true;
        state.currentPageSearch = action.payload.currentPage + 1;
        state.totalPagesSearch = action.payload.totalPages;
        state.totalItemsSearch = action.payload.totalItems;
      })

      // Filter statistic
      .addCase(filterStatistic.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isFilter = true;
        state.dataTable = action.payload.groups;
        state.currentPage = action.payload.currentPage + 1;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      });
  }
});

export const {
  groupItemsPerPageChange,
  updateSearchRequest,
  updateFilterRequest,
  updateFilterValue,
  searchByButton,
  updateStatisticColumnHeaders,
  resetState
} = statisticSlice.actions;

export default statisticSlice;
