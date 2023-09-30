import React, { useEffect } from "react";
import { Card, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import SelectAllFeature from "components/SelectAllFeature";
import DataTableCustom from "components/Tables/DataTable/DataTableCustom";
import DataTable from "components/Tables/DataTable";

import { ErrorAlert } from "components/SweetAlert";

import {
  allCategoriesSelector,
  getCategoriesSelectAllSelector,
  getCategoryItemsPerPageSelector,
  getCategorySelectAllSearchSelector,
  getCategoryCurrentPageSearchSelector,
  getCategoryTotalItemsSearchSelector,
  getCategoryTotalPagesSearchSelector,
  getCategorySearchRequestSelector,
  getIsSearchCategorySelector,
  getAllCategoriesSearchSelector,
  getCategoryColumnHeadersSelector
} from "redux/groupsCategory/selector";
import {
  searchCategory,
  categoryItemsPerPageChange,
  searchByButton,
  updateSelectAll,
  resetState
} from "redux/groupsCategory/slice";

import categoryTableData from "./data/categoryTableData";
import AddCategoryButton from "./components/AddCategoryButton";
import SearchBox from "./components/Search";
import ExportButton from "./components/ExportButton";

function GroupCategory() {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const allCategories = useSelector(allCategoriesSelector);
  const isSelectAll = useSelector(getCategoriesSelectAllSelector);

  const searchCategories = useSelector(getAllCategoriesSearchSelector);
  const isSearch = useSelector(getIsSearchCategorySelector);
  const itemsPerPage = useSelector(getCategoryItemsPerPageSelector);
  const isSelectAllSearch = useSelector(getCategorySelectAllSearchSelector);
  const currentPageSearch = useSelector(getCategoryCurrentPageSearchSelector);
  const totalPagesSearch = useSelector(getCategoryTotalPagesSearchSelector);
  const totalItemsSearch = useSelector(getCategoryTotalItemsSearchSelector);
  const searchRequest = useSelector(getCategorySearchRequestSelector);

  const columnHeaders = useSelector(getCategoryColumnHeadersSelector);

  const tableData = !isSearch
    ? categoryTableData(
        allCategories,
        isSelectAll,
        currentPageSearch,
        itemsPerPage,
        isSearch,
        columnHeaders
      )
    : categoryTableData(
        searchCategories,
        isSelectAllSearch,
        currentPageSearch,
        itemsPerPage,
        isSearch,
        columnHeaders
      );
  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm --------------------

  const isDisabledExport = () => {
    return isSearch ? totalItemsSearch === 0 : allCategories.length === 0;
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSearch) {
      const pageChangeInfo = {
        page: 0,
        size: itemsPerPage
      };
      dispatch(searchCategory({ ...searchRequest, ...pageChangeInfo }));
    }
  }, [totalItemsSearch]);

  const handleChangeItemsPerPage = async (value) => {
    try {
      const pageChangeInfo = {
        page: 0,
        size: value
      };
      dispatch(categoryItemsPerPageChange(value));
      if (isSearch) {
        dispatch(searchByButton(false));
        await dispatch(searchCategory({ ...searchRequest, ...pageChangeInfo })).unwrap();
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

      if (isSearch) {
        dispatch(updateSelectAll({ type: 2, value: false }));
        dispatch(searchByButton(false));
        await dispatch(searchCategory({ ...searchRequest, ...pageChangeInfo })).unwrap();
      } else {
        dispatch(updateSelectAll({ type: 1, value: false }));
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
          headerFilterType="group-category"
        />
      );
    }

    return (
      <DataTable
        table={tableData}
        isSorted
        entriesPerPage
        showTotalEntries={false}
        noEndBorder={false}
        headerFilterType="group-category"
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
                      Danh sách loại nhóm
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <SelectAllFeature type="group-category" />
                    <AddCategoryButton />
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

export default GroupCategory;
