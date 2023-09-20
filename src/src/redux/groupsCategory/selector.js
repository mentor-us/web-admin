import { createSelector } from "@reduxjs/toolkit";

export const allCategoriesSelector = (state) => state.categories.data;
export const getCategoriesSelectAllSelector = (state) => state.categories.isSelectAll;

export const getCategoryItemsPerPageSelector = (state) => state.categories.itemsPerPage;

export const getCategorySelectAllSearchSelector = (state) => state.categories.isSelectAllSearch;
export const getAllCategoriesSearchSelector = (state) => state.categories.dataSearch;
export const getIsSearchCategorySelector = (state) => state.categories.isSearch;
export const getCategoryCurrentPageSearchSelector = (state) => state.categories.currentPageSearch;
export const getCategoryTotalPagesSearchSelector = (state) => state.categories.totalPagesSearch;
export const getCategoryTotalItemsSearchSelector = (state) => state.categories.totalItemsSearch;
export const getCategorySearchRequestSelector = (state) => state.categories.searchRequest;

export const getCategoryColumnHeadersSelector = (state) => state.categories.columnHeaders;

export const getCategoryPermissionsSelector = (state) => state.categories.permissons;

export const getCategorySelector = createSelector(
  allCategoriesSelector,
  (state, id) => id,
  (categories, id) => {
    return categories.find((item) => item.id === id);
  }
);

export const getCategoryByNameSelector = createSelector(
  allCategoriesSelector,
  (state, name) => name,
  (categories, name) => {
    return categories.find((item) => item.name === name);
  }
);

export const getGroupsCategoryCheckedSelector = createSelector(
  allCategoriesSelector,
  getCategoriesSelectAllSelector,
  getIsSearchCategorySelector,
  getAllCategoriesSearchSelector,
  getCategorySelectAllSearchSelector,
  (allCategories, isSelectAll, isSearch, searchCategories, isSelectAllSearch) => {
    if (isSearch) {
      if (isSelectAllSearch || searchCategories.some((item) => item.isChecked))
        return searchCategories.filter((item) => item.isChecked);
    } else if (isSelectAll || allCategories.some((item) => item.isChecked))
      return allCategories.filter((item) => item.isChecked);
    // if (isSelectAll || allCategories.some((item) => item.isChecked))
    //   return allCategories.filter((item) => item.isChecked);

    return [];
  }
);
