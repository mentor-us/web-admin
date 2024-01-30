/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ITEMS_PER_PAGE } from "config";
import { addCheckedProp } from "utils";

import groupsServices from "service/groupsServices";

const columnHeaders = [
  { text: "Tên nhóm", textValue: "name", isShow: true },
  { text: "Loại nhóm", textValue: "groupCategory", isShow: true },
  { text: "Trạng thái", textValue: "status", isShow: true },
  { text: "Thời gian bắt đầu", textValue: "timeStart", isShow: true },
  { text: "Thời gian kết thúc", textValue: "timeEnd", isShow: true },
  { text: "Thời hạn", textValue: "duration", isShow: true }
];

const initialState = {
  status: "idle",
  data: [],
  isFirstLoad: true,
  totalPages: 1,
  currentPage: 1,
  totalItems: 0,
  itemsPerPage: parseInt(ITEMS_PER_PAGE, 10),
  isSelectAll: false,

  dataSearch: [],
  isSearch: false,
  totalPagesSearch: 1,
  currentPageSearch: 1,
  totalItemsSearch: 0,
  isSelectAllSearch: false,
  searchRequest: {},
  isSearchByButton: false,

  columnHeaders,
  error: null
};

export const getAllGroups = createAsyncThunk("groups/getAllGroups", async (req) => {
  const response = await groupsServices.getAllGroups(req);
  return response;
});

export const getGroup = createAsyncThunk("groups/getGroup", async () => {
  const response = await groupsServices.getGroup();
  return addCheckedProp(response.groups);
});

export const searchGroup = createAsyncThunk("groups/searchGroup", async (req) => {
  const response = await groupsServices.searchGroup(req);
  return response;
});

export const addNewGroup = createAsyncThunk("groups/addNewGroup", async (req) => {
  const response = await groupsServices.addNewGroup(req);
  return addCheckedProp(response);
});

export const importGroups = createAsyncThunk("groups/importGroups", async (req) => {
  const response = await groupsServices.importGroups(req);
  return addCheckedProp(response);
});

export const editGroup = createAsyncThunk("groups/editGroup", async ({ id, req }) => {
  const response = await groupsServices.editGroup(id, req);
  return response;
});

export const deleteGroup = createAsyncThunk("groups/deleteGroup", async (id) => {
  const response = await groupsServices.deleteGroup(id);
  return addCheckedProp(response);
});

export const deleteMultipleGroups = createAsyncThunk("groups/deleteMultipleGroups", async (req) => {
  const response = await groupsServices.deleteMultipleGroups(req);
  return response;
});

export const enableGroup = createAsyncThunk("groups/enableGroup", async (req) => {
  const response = await groupsServices.enableGroup(req);
  return response;
});

export const disableGroup = createAsyncThunk("groups/disableGroup", async (req) => {
  const response = await groupsServices.disableGroup(req);
  return response;
});

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    groupCheckboxAllChange: (state, action) => {
      if (!state.isSearch) {
        state.data = state.data.map((item) => {
          if (item.status !== "DELETED") {
            return { ...item, isChecked: !state.isSelectAll };
          }

          return item;
        });
        state.isSelectAll = !state.isSelectAll;
      } else {
        state.dataSearch = state.dataSearch.map((item) => {
          if (item.status !== "DELETED") {
            return {
              ...item,
              isChecked: !state.isSelectAllSearch
            };
          }
          return item;
        });
        state.isSelectAllSearch = !state.isSelectAllSearch;
      }
    },
    groupCheckboxSingleChange: (state, action) => {
      let currentGroup = {};
      if (!state.isSearch) {
        currentGroup = state.data.find((item) => item.id === action.payload.id);
      } else {
        currentGroup = state.dataSearch.find((item) => item.id === action.payload.id);
      }
      Object.assign(currentGroup, { isChecked: !currentGroup.isChecked });

      if (!state.isSearch) {
        state.isSelectAll =
          state.data.filter((item) => item.status !== "DELETED").length ===
          state.data.filter((item) => item.isChecked && item.status !== "DELETED").length;
      } else {
        state.isSelectAllSearch =
          state.dataSearch.filter((item) => item.status !== "DELETED").length ===
          state.dataSearch.filter((item) => item.isChecked && item.status !== "DELETED").length;
      }
    },
    removeGroupWithRemovedCategory: (state, action) => {
      if (Array.isArray(action.payload)) {
        const removedCategoriesID = action.payload.map((item) => item.id);
        state.data = state.data.filter((item) => !removedCategoriesID.includes(item.groupCategory));
      } else {
        state.data = state.data.filter((item) => item.groupCategory !== action.payload.id);
      }
    },
    groupItemsPerPageChange: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    updateSelectAll: (state, action) => {
      if (action.payload.type === 1) {
        state.isSelectAll = action.payload.value;
      } else {
        state.isSelectAllSearch = action.payload.value;
      }
    },
    updateSearchRequest: (state, action) => {
      state.searchRequest = action.payload;
    },
    searchByButton: (state, action) => {
      state.isSearchByButton = action.payload;
    },
    updateGroupColumnHeaders: (state, action) => {
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
      state.isSelectAll = false;
      state.data = state.data.map((item) => ({ ...item, isChecked: false }));

      state.dataSearch = [];
      state.isSearch = false;
      state.totalPagesSearch = 1;
      state.currentPageSearch = 1;
      state.totalItemsSearch = 0;
      state.isSelectAllSearch = false;
      state.searchRequest = {};
      state.isSearchByButton = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Load tất cả các group
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.isFirstLoad) {
          state.isSelectAll = false;
          state.isFirstLoad = false;
        }
        state.isSearch = false;
        state.dataSearch = [];
        state.data = addCheckedProp(action.payload.groups, state.isSelectAll);
        state.currentPage = action.payload.currentPage + 1;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      // Tìm group
      .addCase(searchGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.isSearchByButton) {
          state.isSelectAllSearch = false;
        }
        state.dataSearch = addCheckedProp(action.payload.groups, state.isSelectAllSearch);
        state.isSearch = true;
        state.currentPageSearch = action.payload.currentPage + 1;
        state.totalPagesSearch = action.payload.totalPages;
        state.totalItemsSearch = action.payload.totalItems;
      })
      // Thêm 1 group
      .addCase(addNewGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalItems += 1;
        state.isSearch = false;
        state.isSelectAll = false;
        // if (state.isSearch) {
        //   state.totalItemsSearch += 1;
        // } else {
        //   state.totalItems += 1;
        // }
      })
      // import nhiều groups
      .addCase(importGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalItems += action.payload.length;
        state.isSearch = false;
        state.isSelectAll = false;
        // if (state.isSearch) {
        //   state.totalItemsSearch += action.payload.length;
        // } else {
        //   state.totalItems += action.payload.length;
        // }
      })
      // Sửa 1 group
      .addCase(editGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        const currentIndex = state.data.findIndex((item) => item.id === action.payload.id);
        state.data[currentIndex] = addCheckedProp(
          action.payload,
          state.data[currentIndex].isChecked
        );

        const currentIndexSearch = state.dataSearch.findIndex(
          (item) => item.id === action.payload.id
        );
        if (currentIndexSearch >= 0) {
          state.dataSearch[currentIndexSearch] = addCheckedProp(
            action.payload,
            state.data[currentIndexSearch].isChecked
          );
        }
      })
      // Xóa 1 group
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        const currentIndex = state.data.findIndex((item) => item.id === action.payload.id);
        state.data[currentIndex] = addCheckedProp(action.payload, false);

        const currentIndexSearch = state.dataSearch.findIndex(
          (item) => item.id === action.payload.id
        );
        if (currentIndexSearch >= 0) {
          state.dataSearch[currentIndexSearch] = addCheckedProp(action.payload, false);
        }

        state.error = null;
      })
      // Xóa 1 hoặc nhiều user
      .addCase(deleteMultipleGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        if (state.isSearch) {
          state.totalItemsSearch -= action.payload.length;
        } else {
          state.totalItems -= action.payload.length;
        }
      })

      // Khóa 1 hoặc nhiều group
      .addCase(disableGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        action.payload.forEach((element) => {
          const currentIndex = state.data.findIndex((item) => item.id === element.id);
          state.data[currentIndex] = addCheckedProp(element, state.data[currentIndex].isChecked);

          const currentIndexSearch = state.dataSearch.findIndex((item) => item.id === element.id);
          if (currentIndexSearch >= 0) {
            state.dataSearch[currentIndexSearch] = addCheckedProp(
              element,
              state.dataSearch[currentIndex].isChecked
            );
          }
        });
      })

      //    Mở khóa 1 hoặc nhiều nhom
      .addCase(enableGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        action.payload.forEach((element) => {
          const currentIndex = state.data.findIndex((item) => item.id === element.id);
          state.data[currentIndex] = addCheckedProp(element, state.data[currentIndex].isChecked);
          const currentIndexSearch = state.dataSearch.findIndex((item) => item.id === element.id);
          if (currentIndexSearch >= 0) {
            state.dataSearch[currentIndexSearch] = addCheckedProp(
              element,
              state.dataSearch[currentIndex].isChecked
            );
          }
        });
      });
  }
});

export const {
  groupCheckboxAllChange,
  groupCheckboxSingleChange,
  removeGroupWithRemovedCategory,
  groupItemsPerPageChange,
  updateSearchRequest,
  searchByButton,
  updateSelectAll,
  updateGroupColumnHeaders,
  resetState
} = groupsSlice.actions;

export default groupsSlice;
