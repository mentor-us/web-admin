import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accounts/slice";
import groupsSlice from "./groups/slice";
import groupCategoriesSlice from "./groupsCategory/slice";
import groupDetailSlice from "./groupDetail/slice";
import currentUserSlice from "./currentUser/slice";
import accountDetailSlice from "./accountDetail/slice";
import configurationSlice from "./configuration/slice";
import statisticSlice from "./statistic/slice";
import statisticDetailSlice from "./statisticDetail/slice";

const store = configureStore({
  reducer: {
    accounts: accountSlice.reducer,
    groups: groupsSlice.reducer,
    categories: groupCategoriesSlice.reducer,
    groupDetail: groupDetailSlice.reducer,
    currentUser: currentUserSlice.reducer,
    accountDetail: accountDetailSlice.reducer,
    configuration: configurationSlice.reducer,
    statistic: statisticSlice.reducer,
    statisticDetail: statisticDetailSlice.reducer
  }
});

export default store;
