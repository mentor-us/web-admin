import { configureStore } from "@reduxjs/toolkit";

import accountDetailSlice from "./accountDetail/slice";
import accountSlice from "./accounts/slice";
import configurationSlice from "./configuration/slice";
import groupDetailSlice from "./groupDetail/slice";
import groupsSlice from "./groups/slice";
import groupCategoriesSlice from "./groupsCategory/slice";
import myInfoSlice from "./myInfo/slice";
import statisticSlice from "./statistic/slice";
import statisticDetailSlice from "./statisticDetail/slice";

const store = configureStore({
  reducer: {
    accounts: accountSlice.reducer,
    groups: groupsSlice.reducer,
    categories: groupCategoriesSlice.reducer,
    groupDetail: groupDetailSlice.reducer,
    myInfo: myInfoSlice.reducer,
    accountDetail: accountDetailSlice.reducer,
    configuration: configurationSlice.reducer,
    statistic: statisticSlice.reducer,
    statisticDetail: statisticDetailSlice.reducer
  }
});

export default store;
