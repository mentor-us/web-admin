/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { ITEMS_PER_PAGE } from "config";
import statisticServices from "service/statisticService";

const columnHeaders = [
  { text: "Email", textValue: "email", isShow: true },
  { text: "Họ tên", textValue: "name", isShow: true },
  { text: "Vai trò", textValue: "role", isShow: true },
  { text: "Số tin nhắn", textValue: "totalMessages", isShow: true },
  { text: "Số công việc", textValue: "totalTasks", isShow: true },
  { text: "Số công việc hoàn thành", textValue: "totalDoneTasks", isShow: true },
  { text: "Số cuộc hẹn tham gia", textValue: "totalMeetings", isShow: true },
  { text: "Lần hoạt động gần nhất", textValue: "lastTimeActive", isShow: true }
];

const initialState = {
  status: "idle",
  data: {},
  dataTable: [],
  dataSearch: [],
  isSearch: false,
  searchRequest: {},
  columnHeaders,
  error: null
};

export const getStatisticDetail = createAsyncThunk("statistic/getStatisticDetail", async (req) => {
  const response = await statisticServices.getStatisticDetail(req);
  return response;
});

export const updateMemberStatisticDetail = createAsyncThunk(
  "statistic/updateMemberStatisticDetail",
  async ({ id, req }) => {
    const response = await statisticServices.updateUserStatistic(id, req);
    return response;
  }
);

export const importGeneralDetail = createAsyncThunk(
  "statistic/importGeneralDetail",
  async (req) => {
    const response = await statisticServices.importGeneral(req);
    return response;
  }
);

export const importTrainingPointFileDetail = createAsyncThunk(
  "statistic/importTrainingPointFileDetail",
  async (req) => {
    const response = await statisticServices.importTrainingPointFile(req);
    return response;
  }
);

export const importStudyingPointFileDetail = createAsyncThunk(
  "statistic/importStudyingPointFileDetail",
  async (req) => {
    const response = await statisticServices.importStudyingPointFile(req);
    return response;
  }
);

export const importEnglishCertFileDetail = createAsyncThunk(
  "statistic/importEnglishCertFileDetail",
  async (req) => {
    const response = await statisticServices.importEnglishCertFile(req);
    return response;
  }
);
export const searchStatisticDetail = createAsyncThunk(
  "statistic/searchStatisticDetail",
  async ({ id, req }) => {
    const response = await statisticServices.searchStatisticDetail(id, req);

    return response;
  }
);

const statisticDetailSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    updateStatisticDetailColumnHeaders: (state, action) => {
      const currentColumn = state.columnHeaders.find(
        (item) => item.textValue === action.payload.textValue
      );
      Object.assign(currentColumn, { isShow: !currentColumn.isShow });
    },
    updateSearchRequest: (state, action) => {
      state.searchRequest = action.payload;
    },
    resetState: (state, action) => {
      state.data = {};
      state.dataTable = [];
      state.dataSearch = [];
      state.isSearch = false;
      state.searchRequest = {};
    }
  },
  extraReducers: (builder) => {
    builder
      // Load chi tiết hoạt động
      .addCase(getStatisticDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.dataTable = action.payload.members;
        state.isSearch = false;
      })
      // Cập nhật thông tin (điểm) cho thành viên trong chi tiết
      .addCase(updateMemberStatisticDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        const currentIndex = state.dataTable.findIndex(
          (item) => item.email === action.payload.email
        );
        state.dataTable[currentIndex].studyingPoint = action.payload.studyingPoint;
        state.dataTable[currentIndex].trainingPoint = action.payload.trainingPoint;
        state.dataTable[currentIndex].hasEnglishCert = action.payload.hasEnglishCert;
      })
      // Import danh sách cập nhật (điểm tổng, đrl, bằng)
      // .addCase(importGeneralDetail.fulfilled, (state, action) => {
      //   state.status = "succeeded";

      //   if (action.payload.length > 0) {
      //     action.payload.forEach((element) => {
      //       const currentIndex = state.dataTable.findIndex((item) => item.email === element.email);
      //       state.dataTable[currentIndex].studyingPoint = element.studyingPoint;
      //       state.dataTable[currentIndex].trainingPoint = element.trainingPoint;
      //       state.dataTable[currentIndex].hasEnglishCert = element.hasEnglishCert === "Có";
      //     });
      //   }
      // })
      // Import danh sách cập nhật drl
      // .addCase(importTrainingPointFileDetail.fulfilled, (state, action) => {
      //   state.status = "succeeded";

      //   if (Object.keys(action.payload).length > 0) {
      //     Object.keys(action.payload).forEach((element) => {
      //       const currentIndex = state.dataTable.findIndex((item) => item.email === element);
      //       state.dataTable[currentIndex].trainingPoint = action.payload[element];
      //     });
      //   }
      // })
      // Import danh sách cập nhật điểm tổng kết
      // .addCase(importStudyingPointFileDetail.fulfilled, (state, action) => {
      //   state.status = "succeeded";

      //   if (Object.keys(action.payload).length > 0) {
      //     Object.keys(action.payload).forEach((element) => {
      //       const currentIndex = state.dataTable.findIndex((item) => item.email === element);
      //       state.dataTable[currentIndex].studyingPoint = action.payload[element];
      //     });
      //   }
      // })
      // Import danh sách cập nhật bằng anh văn
      // .addCase(importEnglishCertFileDetail.fulfilled, (state, action) => {
      //   state.status = "succeeded";

      //   if (Object.keys(action.payload).length > 0) {
      //     Object.keys(action.payload).forEach((element) => {
      //       const currentIndex = state.dataTable.findIndex((item) => item.email === element);
      //       state.dataTable[currentIndex].hasEnglishCert = action.payload[element] === "Có";
      //     });
      //   }
      // })
      // // search statistic detail
      .addCase(searchStatisticDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataSearch = action.payload;
        state.isSearch = true;
      });
  }
});

export const { updateStatisticDetailColumnHeaders, updateSearchRequest, resetState } =
  statisticDetailSlice.actions;

export default statisticDetailSlice;
