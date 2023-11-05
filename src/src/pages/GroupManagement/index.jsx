import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Grid } from "@mui/material";
import { loadByEmail } from "features/accounts/slice";
import {
  allGroupsSelector,
  getAllGroupsSearchSelector,
  getGroupColumnHeadersSelector,
  getGroupCurrentPageSearchSelector,
  getGroupCurrentPageSelector,
  getGroupItemsPerPageSelector,
  getGroupSearchRequestSelector,
  getGroupsSelectAllSearchSelector,
  getGroupsSelectAllSelector,
  getGroupTotalItemsSearchSelector,
  getGroupTotalItemsSelector,
  getGroupTotalPagesSearchSelector,
  getGroupTotalPagesSelector,
  getIsSearchGroupSelector
} from "features/groups/selector";
import {
  getAllGroups,
  groupItemsPerPageChange,
  resetState,
  searchByButton,
  searchGroup,
  updateSelectAll
} from "features/groups/slice";
// import DataTable from "components/Tables/DataTable";
import { allCategoriesSelector } from "features/groupsCategory/selector";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import SelectAllFeature from "components/SelectAllFeature";
import { ErrorAlert } from "components/SweetAlert";
import DataTableCustom from "components/Tables/DataTable/DataTableCustom";

import AddNewGroupButton from "./components/AddNewGroupButton";
import ExportButton from "./components/ExportButton";
import ImportModalButton from "./components/Modals/ImportModalButton";
import SearchBox from "./components/Search";
import groupTableData from "./data/groupTableData";
import "./style.css";

function GroupManagement() {
  /// --------------------- Khai báo Biến, State -------------
  const dispatch = useDispatch();
  const allGroups = useSelector(allGroupsSelector);
  const isSelectAll = useSelector(getGroupsSelectAllSelector);
  const isSearch = useSelector(getIsSearchGroupSelector);
  const searchGroups = useSelector(getAllGroupsSearchSelector);
  const allCategories = useSelector(allCategoriesSelector);
  const currentPage = useSelector(getGroupCurrentPageSelector);
  const totalPages = useSelector(getGroupTotalPagesSelector);
  const totalItems = useSelector(getGroupTotalItemsSelector);
  const itemsPerPage = useSelector(getGroupItemsPerPageSelector);

  const isSelectAllSearch = useSelector(getGroupsSelectAllSearchSelector);
  const currentPageSearch = useSelector(getGroupCurrentPageSearchSelector);
  const totalPagesSearch = useSelector(getGroupTotalPagesSearchSelector);
  const totalItemsSearch = useSelector(getGroupTotalItemsSearchSelector);
  const searchRequest = useSelector(getGroupSearchRequestSelector);

  const columnHeaders = useSelector(getGroupColumnHeadersSelector);
  const isShowColumns = columnHeaders.filter((item) => item.isShow);

  const tableData = !isSearch
    ? groupTableData(
        allCategories,
        allGroups,
        isSelectAll,
        currentPage,
        itemsPerPage,
        columnHeaders
      )
    : groupTableData(
        allCategories,
        searchGroups,
        isSelectAllSearch,
        currentPageSearch,
        itemsPerPage,
        columnHeaders
      );

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const isDisabledExport = () => {
    return isSearch ? totalItemsSearch === 0 : totalItems === 0;
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------
  useEffect(() => {
    const loadUserForAdd = async () => {
      try {
        await dispatch(loadByEmail("")).unwrap();
      } catch (error) {
        if (error?.message !== "401") {
          ErrorAlert(error?.message);
        }
      }
    };

    loadUserForAdd();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isSearch) {
      dispatch(
        getAllGroups({
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
      dispatch(searchGroup({ ...searchRequest, ...pageChangeInfo }));
    }
  }, [totalItemsSearch]);

  const handleChangeItemsPerPage = async (value) => {
    try {
      const pageChangeInfo = {
        page: 0,
        size: value
      };
      dispatch(groupItemsPerPageChange(value));
      if (!isSearch) {
        await dispatch(getAllGroups(pageChangeInfo)).unwrap();
      } else {
        dispatch(searchByButton(false));
        await dispatch(searchGroup({ ...searchRequest, ...pageChangeInfo })).unwrap();
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
        await dispatch(getAllGroups(pageChangeInfo)).unwrap();
      } else {
        dispatch(searchByButton(false));
        dispatch(updateSelectAll({ type: 2, value: false }));
        await dispatch(searchGroup({ ...searchRequest, ...pageChangeInfo })).unwrap();
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
          headerFilterType="groups"
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
        headerFilterType="groups"
        minWidth={isShowColumns.length > 5 ? `${isShowColumns.length * 220}px` : "100%"}
      />
    );
  };

  /// --------------------------------------------------------

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={1}>
        <MDBox id="relationship__searchBox">
          <SearchBox />
        </MDBox>
        <MDBox mt={2}>
          <Card>
            <MDBox p={3} pb={0}>
              <MDBox
                mb={1}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h5">Danh sách nhóm</MDTypography>
                <MDBox
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <SelectAllFeature type="groups" />
                  <AddNewGroupButton />
                  <ImportModalButton />
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
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default GroupManagement;
