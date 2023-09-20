import { createSelector } from "@reduxjs/toolkit";

export const getAccountDetailSelector = (state) => state.accountDetail.data;
export const getAccountDetailGroupsSelector = (state) => state.accountDetail.data.groups;

export const getAccountDetailColumnHeadersMenteeSelector = (state) =>
  state.accountDetail.columnHeadersMentee;
export const getAccountDetailColumnHeadersMentorSelector = (state) =>
  state.accountDetail.columnHeadersMentor;

export const getAccountDetailGroupsByTypeSelector = createSelector(
  getAccountDetailGroupsSelector,
  (state, groupRole) => groupRole,
  (groups, groupRole) => {
    if (groups && groups.length > 0) return groups.filter((item) => item.role === groupRole);
    return groups;
  }
);
