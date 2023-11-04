export const getStatisticGeneralSelector = (state) => state.statistic.dataGeneral;
export const getStatisticGeneralByGroupCategorySelector = (state) =>
  state.statistic.dataFilterGeneral;
export const getStatisticByMonthSelector = (state) => state.statistic.dataByMonth;
export const getStatisticTableSelector = (state) => state.statistic.dataTable;
export const getStatisticCurrentPageSelector = (state) => state.statistic.currentPage;
export const getStatisticTotalPagesSelector = (state) => state.statistic.totalPages;
export const getStatisticTotalItemsSelector = (state) => state.statistic.totalItems;
export const getStatisticItemsPerPageSelector = (state) => state.statistic.itemsPerPage;

export const getStatisticSelectAllSearchSelector = (state) => state.statistic.isSelectAllSearch;
export const getAllStatisticSearchSelector = (state) => state.statistic.dataSearch;
export const getIsSearchStatisticSelector = (state) => state.statistic.isSearch;
export const getStatisticCurrentPageSearchSelector = (state) => state.statistic.currentPageSearch;
export const getStatisticTotalPagesSearchSelector = (state) => state.statistic.totalPagesSearch;
export const getStatisticTotalItemsSearchSelector = (state) => state.statistic.totalItemsSearch;
export const getStatisticSearchRequestSelector = (state) => state.statistic.searchRequest;
// export const getStatisticFilterValueSelector = (state) => state.statistic.filterValue;

export const getIsFilterStatisticSelector = (state) => state.statistic.isFilter;
export const getStatisticFilterRequestSelector = (state) => state.statistic.filterRequest;
export const getStatisticFilterValueSelector = (state) => state.statistic.filterValue;

export const getStatisticColumnHeadersSelector = (state) => state.statistic.columnHeaders;
