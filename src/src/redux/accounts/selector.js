import { createSelector } from "@reduxjs/toolkit";

export const allAccountSelector = (state) => state.accounts.data;
export const getSelectAllSelector = (state) => state.accounts.isSelectAll;
export const getAllAccountSearchSelector = (state) => state.accounts.dataSearch;
export const getIsSearchAccountSelector = (state) => state.accounts.isSearch;
export const getAccountSelector = (state, id) => state.accounts.data.find((item) => item.id === id);
export const getAccountsTableSelector = (state) => state.accounts.dataTable;
export const getAccountCurrentPageSelector = (state) => state.accounts.currentPage;
export const getAccountTotalPagesSelector = (state) => state.accounts.totalPages;
export const getAccountTotalItemsSelector = (state) => state.accounts.totalItems;
export const getAccountItemsPerPageSelector = (state) => state.accounts.itemsPerPage;
export const getAccountMenteesDetailSelector = (state) => state.accounts.mentees;
export const getAccountMentorsDetailSelector = (state) => state.accounts.mentors;

export const getAccountsSelectAllSearchSelector = (state) => state.accounts.isSelectAllSearch;
export const getAccountCurrentPageSearchSelector = (state) => state.accounts.currentPageSearch;
export const getAccountTotalPagesSearchSelector = (state) => state.accounts.totalPagesSearch;
export const getAccountTotalItemsSearchSelector = (state) => state.accounts.totalItemsSearch;
export const getAccountSearchRequestSelector = (state) => state.accounts.searchRequest;

export const getAccountColumnHeadersSelector = (state) => state.accounts.columnHeaders;

export const allAccountByEmailsSelector = createSelector(allAccountSelector, (allAccounts) => {
  return allAccounts?.map((item) => {
    const itemObject = {};
    itemObject.email = item.email;

    return itemObject;
  });
});

export const getAccountByUserIdsSelector = createSelector(
  getAccountsTableSelector,
  (state, UserIDs) => UserIDs,
  (allAccounts, UserIDs) => {
    const userList = [];
    UserIDs?.forEach((element) => {
      const itemObject = allAccounts.find((item) => item.id === element);
      if (itemObject) userList.push(itemObject);
    });

    return userList;
  }
);

export const getAccountCheckedSelector = createSelector(
  allAccountSelector,
  getSelectAllSelector,
  getIsSearchAccountSelector,
  getAllAccountSearchSelector,
  getAccountsSelectAllSearchSelector,
  (allAccounts, isSelectAll, isSearch, searchAccounts, isSelectAllSearch) => {
    if (isSearch) {
      if (isSelectAllSearch || searchAccounts.some((item) => item.isChecked))
        return searchAccounts.filter((item) => item.isChecked);
    } else if (isSelectAll || allAccounts.some((item) => item.isChecked))
      return allAccounts.filter((item) => item.isChecked);

    return [];
  }
);
