/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ITEMS_PER_PAGE } from "config";
import { addCheckedProp } from "utils";

import groupsCategoryServices from "service/groupsCategoryServices";

const columnHeaders = [
  { text: "Loại nhóm", textValue: "name", isShow: true },
  { text: "Mô tả", textValue: "description", isShow: true },
  { text: "Biểu tượng", textValue: "iconUrl", isShow: true },
  { text: "Trạng thái", textValue: "status", isShow: true }
];

const initialState = {
  status: "idle",
  data: [],
  isSelectAll: false,
  isFirstLoad: true,

  dataSearch: [],
  isSearch: false,
  totalPagesSearch: 1,
  currentPageSearch: 1,
  totalItemsSearch: 0,
  itemsPerPage: parseInt(ITEMS_PER_PAGE, 10),
  isSelectAllSearch: false,
  searchRequest: {},
  isSearchByButton: false,

  permissons: [],

  columnHeaders,
  error: null
};

export const getAllCategory = createAsyncThunk("groupsCategory/getAllCategory", async () => {
  const response = await groupsCategoryServices.getAllCategories();
  return response;
});

export const addNewCategory = createAsyncThunk("groupsCategory/addNewCategory", async (req) => {
  const response = await groupsCategoryServices.addNewCategory(req);
  return response;
});

export const editCategory = createAsyncThunk("groupsCategory/editCategory", async ({ id, req }) => {
  const response = await groupsCategoryServices.editCategory(id, req);
  return response;
});

export const deleteCategory = createAsyncThunk(
  "groupsCategory/deleteCategory",
  async ({ id, req }) => {
    const response = await groupsCategoryServices.deleteCategory(id, req);
    return response;
  }
);

export const deleteMultipleCategories = createAsyncThunk(
  "groupsCategory/deleteMultipleCategories",
  async (req) => {
    const response = await groupsCategoryServices.deleteMultipleCategories(req);
    return response;
  }
);

export const searchCategory = createAsyncThunk("groupsCategory/searchCategory", async (req) => {
  const response = await groupsCategoryServices.searchCategory(req);
  return response;
});

export const getPermissions = createAsyncThunk("groupsCategory/getPermissions", async (req) => {
  const response = await groupsCategoryServices.getPermissions(req);
  return response;
});

const groupCategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoryCheckboxAllChange: (state, action) => {
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
    categoryCheckboxSingleChange: (state, action) => {
      let currentCategory = {};
      if (!state.isSearch) {
        currentCategory = state.data.find((item) => item.id === action.payload.id);
      } else {
        currentCategory = state.dataSearch.find((item) => item.id === action.payload.id);
      }

      Object.assign(currentCategory, { isChecked: !currentCategory.isChecked });

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
    categoryItemsPerPageChange: (state, action) => {
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
    updateCategoryColumnHeaders: (state, action) => {
      const currentColumn = state.columnHeaders.find(
        (item) => item.textValue === action.payload.textValue
      );
      Object.assign(currentColumn, { isShow: !currentColumn.isShow });
    },
    resetState: (state, action) => {
      state.isFirstLoad = true;
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
      // Load tất cả các category
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.isFirstLoad) {
          state.isSelectAll = false;
          state.isFirstLoad = false;
        }
        state.data = addCheckedProp(action.payload, state.isSelectAll);
        state.isSearch = false;
        state.dataSearch = [];
      })
      // Thêm 1 category
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.unshift(action.payload);
        state.data = addCheckedProp(state.data);
        state.isSelectAll = false;
        state.isSearch = false;
      })
      // Sửa 1 category
      .addCase(editCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        const currentIndex = state.data.findIndex((item) => item.id === action.payload.id);
        state.data[currentIndex] = action.payload;
      })
      // Xóa 1 category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.isSearch) {
          // state.totalItemsSearch -= 1;
          const currentIndex = state.dataSearch.findIndex((item) => item.id === action.payload.id);
          state.dataSearch[currentIndex] = action.payload;
        } else {
          // state.data = state.data.filter((item) => item.id !== action.payload.id);
          const currentIndex = state.data.findIndex((item) => item.id === action.payload.id);
          state.data[currentIndex] = action.payload;
        }

        state.error = null;
      })
      // Xóa 1 hoặc nhiều loại nhóm
      .addCase(deleteMultipleCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        if (state.isSearch) {
          // state.totalItemsSearch -= action.payload.length;
          action.payload.forEach((element) => {
            const currentIndex = state.dataSearch.findIndex((item) => item.id === element.id);
            state.dataSearch[currentIndex] = element;
          });
        } else {
          action.payload.forEach((element) => {
            const currentIndex = state.data.findIndex((item) => item.id === element.id);
            state.data[currentIndex] = element;

            // state.data = state.data.filter((item) => item.id !== element.id);
          });
        }
      })
      .addCase(searchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.isSearchByButton) {
          state.isSelectAllSearch = false;
        }
        state.dataSearch = addCheckedProp(action.payload.content, state.isSelectAllSearch);
        state.isSearch = true;
        state.currentPageSearch = action.payload.currentPage + 1;
        state.totalPagesSearch = action.payload.totalPages;
        state.totalItemsSearch = action.payload.totalItems;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.permissons = action.payload;
      });
  }
});

export const {
  categoryCheckboxAllChange,
  categoryCheckboxSingleChange,
  categoryItemsPerPageChange,
  searchByButton,
  updateSelectAll,
  updateSearchRequest,
  updateCategoryColumnHeaders,
  resetState
} = groupCategoriesSlice.actions;

export default groupCategoriesSlice;
