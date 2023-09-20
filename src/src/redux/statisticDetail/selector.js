export const getStatisticDetailSelector = (state) => state.statisticDetail.data;
export const getStatisticDetailTableSelector = (state) => state.statisticDetail.dataTable;
// export const getStatisticDetailCurrentPageSelector = (state) => state.statisticDetail.currentPage;
// export const getStatisticDetailTotalPagesSelector = (state) => state.statisticDetail.totalPages;
// export const getStatisticTotalItemsSelector = (state) => state.statisticDetail.totalItems;
// export const getStatisticItemsPerPageSelector = (state) => state.statisticDetail.itemsPerPage;
export const getIsSearchStatisticDetailSelector = (state) => state.statisticDetail.isSearch;
export const getAllStatisticDetailSearchSelector = (state) => state.statisticDetail.dataSearch;
export const getStatisticDetailSearchRequestSelector = (state) =>
  state.statisticDetail.searchRequest;

export const getStatisticDetailColumnHeadersSelector = (state) =>
  state.statisticDetail.columnHeaders;
