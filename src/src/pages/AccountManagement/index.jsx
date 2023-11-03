import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Grid } from "@mui/material";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
// import DataTable from "components/Tables/DataTable";
import SelectAllFeature from "components/SelectAllFeature";
import { ErrorAlert } from "components/SweetAlert";
import DataTableCustom from "components/Tables/DataTable/DataTableCustom";

import {
  allAccountSelector,
  getAccountColumnHeadersSelector,
  getAccountCurrentPageSearchSelector,
  getAccountCurrentPageSelector,
  getAccountItemsPerPageSelector,
  getAccountSearchRequestSelector,
  getAccountsSelectAllSearchSelector,
  getAccountTotalItemsSearchSelector,
  getAccountTotalItemsSelector,
  getAccountTotalPagesSearchSelector,
  getAccountTotalPagesSelector,
  getAllAccountSearchSelector,
  getIsSearchAccountSelector,
  getSelectAllSelector
} from "redux/accounts/selector";
import {
  getAllUserPaging,
  itemsPerPageChange,
  resetState,
  searchAccount,
  searchByButton,
  updateSelectAll
} from "redux/accounts/slice";

import AddAccountButton from "./components/AddAccountButton";
import ExportButton from "./components/ExportButton";
import ImportAccountButton from "./components/ImportAccountButton";
import SearchBox from "./components/Search";
import accountTableData from "./data/accountTableData";

function AccountManagement() {
  /// --------------------- Khai báo Biến, State -------------
  const dispatch = useDispatch();
  const allAccounts = useSelector(allAccountSelector);
  const isSelectAll = useSelector(getSelectAllSelector);
  const isSearch = useSelector(getIsSearchAccountSelector);
  const searchAccounts = useSelector(getAllAccountSearchSelector);
  const currentPage = useSelector(getAccountCurrentPageSelector);
  const totalPages = useSelector(getAccountTotalPagesSelector);
  const totalItems = useSelector(getAccountTotalItemsSelector);
  const itemsPerPage = useSelector(getAccountItemsPerPageSelector);

  const isSelectAllSearch = useSelector(getAccountsSelectAllSearchSelector);
  const currentPageSearch = useSelector(getAccountCurrentPageSearchSelector);
  const totalPagesSearch = useSelector(getAccountTotalPagesSearchSelector);
  const totalItemsSearch = useSelector(getAccountTotalItemsSearchSelector);
  const searchRequest = useSelector(getAccountSearchRequestSelector);

  const columnHeaders = useSelector(getAccountColumnHeadersSelector);

  const tableData = !isSearch
    ? accountTableData(allAccounts, isSelectAll, currentPage, itemsPerPage, columnHeaders)
    : accountTableData(
        searchAccounts,
        isSelectAllSearch,
        currentPageSearch,
        itemsPerPage,
        columnHeaders
      );

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm --------------------

  const isDisabledExport = () => {
    return isSearch ? totalItemsSearch === 0 : totalItems === 0;
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isSearch) {
      dispatch(
        getAllUserPaging({
          page: 0,
          size: itemsPerPage
        })
      );
    }
  }, [totalItems]);

  useEffect(() => {
    if (isSearch) {
      const pageChangeInfo = {
        page: 0,
        size: itemsPerPage
      };
      dispatch(searchAccount({ ...searchRequest, ...pageChangeInfo }));
    }
  }, [totalItemsSearch]);

  const handleChangeItemsPerPage = async (value) => {
    try {
      const pageChangeInfo = {
        page: 0,
        size: value
      };

      dispatch(itemsPerPageChange(value));

      if (!isSearch) {
        await dispatch(getAllUserPaging(pageChangeInfo)).unwrap();
      } else {
        dispatch(searchByButton(false));
        await dispatch(searchAccount({ ...searchRequest, ...pageChangeInfo })).unwrap();
      }
    } catch (error) {
      ErrorAlert(error.message);
    }
  };

  const handleChangePage = async (value) => {
    try {
      const pageChangeInfo = {
        page: value,
        size: itemsPerPage
      };

      if (!isSearch) {
        dispatch(updateSelectAll({ type: 1, value: false }));
        await dispatch(getAllUserPaging(pageChangeInfo)).unwrap();
      } else {
        dispatch(updateSelectAll({ type: 2, value: false }));
        dispatch(searchByButton(false));
        await dispatch(searchAccount({ ...searchRequest, ...pageChangeInfo })).unwrap();
      }
    } catch (error) {
      ErrorAlert(error.message);
    }
  };

  const renderTable = () => {
    if (isSearch) {
      return (
        <DataTableCustom
          table={tableData}
          isSorted
          noEndBorder={false}
          customPaginationInfo={{
            currentPage: currentPageSearch,
            totalPages: totalPagesSearch,
            totalItems: totalItemsSearch,
            itemsPerPage,
            handleChangeItemsPerPage,
            handleChangePage
          }}
          headerFilterType="account-management"
        />
      );
    }
    /// --------------------------------------------------------
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
        headerFilterType="account-management"
      />
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={1}>
        <MDBox id="relationship__searchBox">
          <SearchBox />
        </MDBox>
        <Grid mt={2} container>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3} pb={0}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <MDBox>
                    <MDTypography variant="h5" gutterBottom>
                      Tài khoản hệ thống
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <SelectAllFeature type="account-management" />
                    <AddAccountButton />
                    <ImportAccountButton />
                    <ExportButton isDisabled={isDisabledExport()} />
                  </MDBox>
                </MDBox>
                <Grid container>
                  <Grid item xs={12}>
                    {renderTable()}
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AccountManagement;
