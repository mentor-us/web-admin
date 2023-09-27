import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import DataTableCustom from "components/Tables/DataTable/DataTableCustom";
import { ErrorAlert } from "components/SweetAlert";

import {
  getStatisticTableSelector,
  getStatisticCurrentPageSelector,
  getStatisticTotalPagesSelector,
  getStatisticItemsPerPageSelector,
  getStatisticTotalItemsSelector,
  getIsSearchStatisticSelector,
  getStatisticCurrentPageSearchSelector,
  getStatisticSearchRequestSelector,
  getStatisticTotalItemsSearchSelector,
  getStatisticTotalPagesSearchSelector,
  getAllStatisticSearchSelector,
  getStatisticFilterValueSelector,
  getStatisticColumnHeadersSelector
} from "redux/statistic/selector";
import {
  getGroupsStatisticTableData,
  groupItemsPerPageChange,
  searchStatistic
  // filterTableStatistic
} from "redux/statistic/slice";

import statisticTableData from "pages/Statistic/data/statisticTableData";
import { Card, Grid } from "@mui/material";
import SearchBox from "../Search";
import {} from "redux/statisticDetail/selector";
import ExportButton from "../ExportButton";

function StatisticTable() {
  /// --------------------- Khai báo Biến, State -------------
  const dispatch = useDispatch();
  const statisticData = useSelector(getStatisticTableSelector);
  const currentPage = useSelector(getStatisticCurrentPageSelector);
  const itemsPerPage = useSelector(getStatisticItemsPerPageSelector);
  const totalPages = useSelector(getStatisticTotalPagesSelector);
  const totalItems = useSelector(getStatisticTotalItemsSelector);

  const isSearch = useSelector(getIsSearchStatisticSelector);

  const searchStatisticsData = useSelector(getAllStatisticSearchSelector);
  const currentPageSearch = useSelector(getStatisticCurrentPageSearchSelector);
  const totalPagesSearch = useSelector(getStatisticTotalPagesSearchSelector);
  const totalItemsSearch = useSelector(getStatisticTotalItemsSearchSelector);
  const searchRequest = useSelector(getStatisticSearchRequestSelector);

  const filterValue = useSelector(getStatisticFilterValueSelector);

  const columnHeaders = useSelector(getStatisticColumnHeadersSelector);
  const isShowColumns = columnHeaders.filter((item) => item.isShow);

  const tableData = !isSearch
    ? statisticTableData(statisticData, currentPage, itemsPerPage, columnHeaders)
    : statisticTableData(searchStatisticsData, currentPageSearch, itemsPerPage, columnHeaders);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const isDisabledExport = () => {
    return isSearch ? totalItemsSearch === 0 : totalItems === 0;
  };

  // function to handle get statistic table data when change item per page
  const handleChangeItemsPerPage = async (value) => {
    try {
      const pageChangeInfo = {
        page: 0,
        pageSize: value
      };
      dispatch(groupItemsPerPageChange(value));
      const req = { groupCategory: filterValue };

      if (!isSearch) {
        if (filterValue !== "") {
          dispatch(
            getGroupsStatisticTableData({
              ...req,
              ...pageChangeInfo
            })
          );
        } else {
          dispatch(getGroupsStatisticTableData({ ...pageChangeInfo }));
        }
      } else {
        await dispatch(searchStatistic({ ...searchRequest, ...pageChangeInfo }));
      }
    } catch (error) {
      ErrorAlert(error.message);
    }
  };

  // function to get statistic table data when change another page
  const handleChangePage = async (value) => {
    try {
      const pageChangeInfo = {
        page: value,
        pageSize: itemsPerPage
      };

      const req = { groupCategory: filterValue };

      if (!isSearch) {
        if (filterValue !== "") {
          dispatch(
            getGroupsStatisticTableData({
              ...req,
              ...pageChangeInfo
            })
          );
        } else {
          dispatch(getGroupsStatisticTableData({ ...pageChangeInfo }));
        }
      } else {
        await dispatch(searchStatistic({ ...searchRequest, ...pageChangeInfo }));
      }
    } catch (error) {
      ErrorAlert(error.message);
    }
  };

  // function to render table
  const renderTable = () => {
    if (isSearch) {
      return (
        <DataTableCustom
          table={tableData}
          isSorted
          // entriesPerPage
          // showTotalEntries={false}
          noEndBorder={false}
          customPaginationInfo={{
            currentPage: currentPageSearch,
            totalPages: totalPagesSearch,
            totalItems: totalItemsSearch,
            itemsPerPage,
            handleChangeItemsPerPage,
            handleChangePage
          }}
          headerFilterType="statistic"
          minWidth={isShowColumns.length > 5 ? `${isShowColumns.length * 220}px` : "100%"}
        />
      );
    }
    return (
      <DataTableCustom
        table={tableData}
        isSorted
        noEndBorder={false}
        customPaginationInfo={{
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage,
          handleChangeItemsPerPage,
          handleChangePage
        }}
        headerFilterType="statistic"
        minWidth={isShowColumns.length > 5 ? `${isShowColumns.length * 220}px` : "100%"}
      />
    );
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  // useEffect to get all data when total items change
  useEffect(() => {
    const pageChangeInfo = {
      page: 0,
      pageSize: itemsPerPage
    };

    const req = { groupCategory: filterValue };
    if (filterValue !== "") {
      dispatch(
        getGroupsStatisticTableData({
          ...req,
          ...pageChangeInfo
        })
      );
    } else {
      dispatch(getGroupsStatisticTableData({ ...pageChangeInfo }));
    }
  }, [totalItems]);

  //  useEffect to get search data when total items change
  useEffect(() => {
    if (isSearch) {
      const pageChangeInfo = {
        page: 0,
        pageSize: itemsPerPage
      };
      dispatch(searchStatistic({ ...searchRequest, ...pageChangeInfo }));
    }
  }, [totalItemsSearch]);

  /// --------------------------------------------------------

  return (
    <MDBox mt={2}>
      <Card>
        <MDBox p={3} pb={0}>
          <MDBox
            mb={2}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography variant="h5">Danh sách hoạt động nhóm</MDTypography>
            <ExportButton isDisabled={isDisabledExport()} />
          </MDBox>
          <SearchBox filterValue={filterValue} />
          <Grid container mt={2}>
            <Grid item xs={12}>
              {renderTable()}
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}

export default StatisticTable;
