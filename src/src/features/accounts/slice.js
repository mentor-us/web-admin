/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ITEMS_PER_PAGE } from "config";
import { addCheckedProp } from "utils";

import accountServices from "service/accountServices";
import { roleMemberEnum } from "utils/constants";

const columnHeaders = [
  { text: "Email", textValue: "email", isShow: true },
  { text: "Tên người dùng", textValue: "name", isShow: true },
  { text: "Vai trò", textValue: "role", isShow: true },
  { text: "Trạng thái", textValue: "status", isShow: true }
];

const initialState = {
  status: "idle",
  data: [],
  totalItems: 0,
  totalPages: 1,
  itemsPerPage: parseInt(ITEMS_PER_PAGE, 10),
  currentPage: 1,
  isFirstLoad: true,
  isSelectAll: false,

  isSearch: false,
  dataSearch: [],
  totalPagesSearch: 1,
  currentPageSearch: 1,
  totalItemsSearch: 0,
  isSelectAllSearch: false,
  searchRequest: {},
  isSearchByButton: false,

  dataTable: [],
  mentors: [],
  mentees: [],

  columnHeaders,
  error: null
};

export const getAllUser = createAsyncThunk("accounts/getAllUser", async () => {
  const response = await accountServices.getAllAccount();
  return response;
});

export const getAllUserPaging = createAsyncThunk("accounts/getAllAccountPaging", async (req) => {
  const response = await accountServices.getAllAccountPaging(req);
  return response;
});

export const addNew = createAsyncThunk("accounts/addNew", async (req) => {
  const response = await accountServices.addNewAccount(req);
  return addCheckedProp(response);
});

export const deleteAccount = createAsyncThunk("accounts/deleteAccount", async (req) => {
  const response = await accountServices.deleteAccount(req);
  return response;
});

export const disableAccount = createAsyncThunk("accounts/disableAccount", async (req) => {
  const response = await accountServices.disableAccount(req);
  return response;
});

export const enableAccount = createAsyncThunk("accounts/enableAccount", async (req) => {
  const response = await accountServices.enableAccount(req);
  return response;
});

export const searchAccount = createAsyncThunk("accounts/searchAccount", async (req) => {
  const response = await accountServices.searchAccount(req);
  return response;
});

export const editAccount = createAsyncThunk("accounts/editAccount", async ({ id, req }) => {
  const response = await accountServices.editAccount(id, req);
  return response;
});

export const deleteMultipleAccount = createAsyncThunk(
  "accounts/deleteMultipleAccount",
  async (req) => {
    const response = await accountServices.deleteMultipleAccount(req);
    return response;
  }
);

export const loadByEmail = createAsyncThunk("accounts/loadByEmail", async (req) => {
  const response = await accountServices.loadByEmail(req);
  return response;
});

export const loadByIds = createAsyncThunk("accounts/loadByIds", async ({ req, type }) => {
  const response = await accountServices.getAccountByIDs(req);

  if (type === roleMemberEnum.mentor) {
    return { mentors: response };
  }
  if (type === roleMemberEnum.mentee) {
    return { mentees: response };
  }
  return { mentors: [], mentees: [] };
});

export const importAccount = createAsyncThunk("accounts/importAccount", async (req) => {
  const response = await accountServices.importAccount(req);
  return addCheckedProp(response);
});

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    accountCheckboxAllChange: (state, action) => {
      if (!state.isSearch) {
        state.data = state.data.map((item) => ({ ...item, isChecked: !state.isSelectAll }));
        state.isSelectAll = !state.isSelectAll;
      } else {
        state.dataSearch = state.dataSearch.map((item) => ({
          ...item,
          isChecked: !state.isSelectAllSearch
        }));
        state.isSelectAllSearch = !state.isSelectAllSearch;
      }
    },
    accountCheckboxSingleChange: (state, action) => {
      let currentAccount = {};
      if (!state.isSearch)
        currentAccount = state.data.find((item) => item.id === action.payload.id);
      else currentAccount = state.dataSearch.find((item) => item.id === action.payload.id);
      Object.assign(currentAccount, { isChecked: !currentAccount.isChecked });

      if (!state.isSearch) {
        state.isSelectAll =
          state.data.length === state.data.filter((item) => item.isChecked).length;
      } else {
        state.isSelectAllSearch =
          state.dataSearch.length === state.dataSearch.filter((item) => item.isChecked).length;
      }
    },
    itemsPerPageChange: (state, action) => {
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
    updateAccountColumnHeaders: (state, action) => {
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
      // Load tất cả các user
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.isFirstLoad) {
          state.isSelectAll = false;
          state.isFirstLoad = false;
        }
        state.data = addCheckedProp(action.payload.content, state.isSelectAll);
        state.isSearch = false;
        state.dataSearch = [];
      })
      // Load tất cả các user phân trang
      .addCase(getAllUserPaging.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.isFirstLoad) {
          state.isSelectAll = false;
          state.isFirstLoad = false;
        }
        state.data = addCheckedProp(action.payload.content, state.isSelectAll);
        state.currentPage = action.payload.currentPage + 1;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
        state.isSearch = false;
        state.dataSearch = [];
      })
      // Thêm 1 user
      .addCase(addNew.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalItems += 1;
        state.isSearch = false;
        state.isSelectAll = false;
      })
      // Xóa 1 user
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.isSearch) {
          state.totalItemsSearch -= 1;
        } else {
          state.totalItems -= 1;
        }

        state.error = null;
      })
      // Khóa 1 hoặc nhiều user
      .addCase(disableAccount.fulfilled, (state, action) => {
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
      // Mở khóa 1 hoặc nhiều user
      .addCase(enableAccount.fulfilled, (state, action) => {
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
      // Tìm kiếm các user
      .addCase(searchAccount.fulfilled, (state, action) => {
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
      // Sửa thông tin 1 tài khoản
      .addCase(editAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        const currentIndex = state.data.findIndex((item) => item.id === action.payload.id);
        state.data[currentIndex] = addCheckedProp(
          action.payload,
          state.data[currentIndex]?.isChecked
        );

        const currentIndexSearch = state.dataSearch.findIndex(
          (item) => item.id === action.payload.id
        );
        if (currentIndexSearch >= 0) {
          state.dataSearch[currentIndexSearch] = addCheckedProp(
            action.payload,
            state.data[currentIndexSearch]?.isChecked
          );
        }
      })
      // Xóa 1 hoặc nhiều user
      .addCase(deleteMultipleAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        if (state.isSearch) {
          state.totalItemsSearch -= action.payload.length;
        } else {
          state.totalItems -= action.payload.length;
        }
      })
      // Load danh sách user theo email
      .addCase(loadByEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.dataTable = action.payload;
      })
      // Load danh sách user theo id
      .addCase(loadByIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.mentors = action.payload.mentors || state.mentors;
        state.mentees = action.payload.mentees || state.mentees;
      })
      // import nhiều groups
      .addCase(importAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalItems += action.payload.length;
        state.isSearch = false;
        state.isSelectAll = false;
      });
  }
});

export const {
  accountCheckboxAllChange,
  accountCheckboxSingleChange,
  itemsPerPageChange,
  updateSelectAll,
  updateSearchRequest,
  searchByButton,
  updateAccountColumnHeaders,
  resetState
} = accountSlice.actions;

export default accountSlice;
