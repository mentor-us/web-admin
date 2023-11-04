import { createSelector } from "@reduxjs/toolkit";

export const allGroupsSelector = (state) => state.groups.data;
export const getGroupsSelectAllSelector = (state) => state.groups.isSelectAll;
export const getGroupCurrentPageSelector = (state) => state.groups.currentPage;
export const getGroupTotalPagesSelector = (state) => state.groups.totalPages;
export const getGroupTotalItemsSelector = (state) => state.groups.totalItems;
export const getGroupItemsPerPageSelector = (state) => state.groups.itemsPerPage;

export const getGroupsSelectAllSearchSelector = (state) => state.groups.isSelectAllSearch;
export const getAllGroupsSearchSelector = (state) => state.groups.dataSearch;
export const getIsSearchGroupSelector = (state) => state.groups.isSearch;
export const getGroupCurrentPageSearchSelector = (state) => state.groups.currentPageSearch;
export const getGroupTotalPagesSearchSelector = (state) => state.groups.totalPagesSearch;
export const getGroupTotalItemsSearchSelector = (state) => state.groups.totalItemsSearch;
export const getGroupSearchRequestSelector = (state) => state.groups.searchRequest;

export const getGroupColumnHeadersSelector = (state) => state.groups.columnHeaders;

export const getGroupSelector = createSelector(
  allGroupsSelector,
  (state, id) => id,
  (groups, id) => {
    return groups.find((item) => item.id === id);
  }
);

export const getGroupsCheckedSelector = createSelector(
  allGroupsSelector,
  getGroupsSelectAllSelector,
  getIsSearchGroupSelector,
  getAllGroupsSearchSelector,
  getGroupsSelectAllSearchSelector,
  (allGroups, isSelectAll, isSearch, searchGroups, isSelectAllSearch) => {
    if (isSearch) {
      if (isSelectAllSearch || searchGroups.some((item) => item.isChecked))
        return searchGroups.filter((item) => item.isChecked);
    } else if (isSelectAll || allGroups.some((item) => item.isChecked))
      return allGroups.filter((item) => item.isChecked);

    return [];
  }
);
