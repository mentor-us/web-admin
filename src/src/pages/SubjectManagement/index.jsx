import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Grid, Icon } from "@mui/material";
import {
  // getAllCategoriesSearchSelector,
  getCategoriesSelectAllSelector,
  getCategoryCurrentPageSearchSelector,
  getCategoryItemsPerPageSelector,
  // getCategorySearchRequestSelector,
  // getCategorySelectAllSearchSelector,
  getCategoryTotalItemsSearchSelector,
  getCategoryTotalPagesSearchSelector,
  getIsSearchCategorySelector
} from "features/groupsCategory/selector";

// import {
//   categoryItemsPerPageChange,
//   resetState,
//   searchByButton,
//   searchCategory,
//   updateSelectAll
// } from "features/groupsCategory/slice";
import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import SelectAllFeature from "components/SelectAllFeature";
import { ErrorAlert } from "components/SweetAlert";
import DataTable from "components/Tables/DataTable";
import DataTableCustom from "components/Tables/DataTable/DataTableCustom";
import useSubjectManagementStore from "hooks/client/useSubjectManagementStore";
import { getAllCourse } from "hooks/grades/queries";

import AddCategoryButton from "./components/AddCategoryButton";
import SearchBox from "./components/Search";
import subjectTableData from "./data/subjectTableData";

function SubjectManagement() {
  /// --------------------- Khai báo Biến, State -------------

  // const dispatch = useDispatch();
  // const allCategories = useSelector(allCategoriesSelector);
  const isSelectAll = useSelector(getCategoriesSelectAllSelector);
  const { data: courses } = getAllCourse("");
  // const searchCategories = useSelector(getAllCategoriesSearchSelector);
  const isSearch = useSelector(getIsSearchCategorySelector);
  const itemsPerPage = useSelector(getCategoryItemsPerPageSelector);
  // const isSelectAllSearch = useSelector(getCategorySelectAllSearchSelector);
  const currentPageSearch = useSelector(getCategoryCurrentPageSearchSelector);
  const totalPagesSearch = useSelector(getCategoryTotalPagesSearchSelector);
  const totalItemsSearch = useSelector(getCategoryTotalItemsSearchSelector);
  // const searchRequest = useSelector(getCategorySearchRequestSelector);
  const { columnHeaders } = useSubjectManagementStore();
  console.log("columnHeaders");
  console.log(columnHeaders);
  const tableData = subjectTableData(
    courses,
    isSelectAll,
    currentPageSearch,
    itemsPerPage,
    isSearch,
    columnHeaders
  );
  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm --------------------

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  // useEffect(() => {
  //   return () => {
  //     // dispatch(resetState());
  //   };
  // }, [dispatch]);

  useEffect(() => {
    if (isSearch) {
      // const pageChangeInfo = {
      //   page: 0,
      //   size: itemsPerPage
      // };
      // dispatch(searchCategory({ ...searchRequest, ...pageChangeInfo }));
    }
  }, [totalItemsSearch]);

  // eslint-disable-next-line no-unused-vars
  const handleChangeItemsPerPage = async (value) => {
    try {
      // const pageChangeInfo = {
      //   page: 0,
      //   size: value
      // };
      // dispatch(categoryItemsPerPageChange(value));
      if (isSearch) {
        // dispatch(searchByButton(false));
        // await dispatch(searchCategory({ ...searchRequest, ...pageChangeInfo })).unwrap();
      }
    } catch (error) {
      ErrorAlert(error.message);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleChangePage = async (value) => {
    try {
      // const pageChangeInfo = {
      //   page: value,
      //   size: itemsPerPage
      // };

      if (isSearch) {
        // dispatch(updateSelectAll({ type: 2, value: false }));
        // dispatch(searchByButton(false));
        // await dispatch(searchCategory({ ...searchRequest, ...pageChangeInfo })).unwrap();
      } else {
        // dispatch(updateSelectAll({ type: 1, value: false }));
      }
    } catch (error) {
      ErrorAlert(error.message);
    }
  };

  // eslint-disable-next-line no-unused-vars
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
          headerFilterType="subject"
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
        headerFilterType="subject"
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
                      Danh sách môn học
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    gap="1rem"
                  >
                    <SelectAllFeature type="group-category" />
                    <AddCategoryButton />
                    <MDButton onClick={() => {}} variant="gradient" color="warning">
                      <Icon sx={{ fontWeight: "bold" }}>file_upload</Icon>
                      <MDTypography
                        variant="body2"
                        fontWeight="regular"
                        color="white"
                        sx={{ pl: 0.5 }}
                      >
                        Import
                      </MDTypography>
                    </MDButton>
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

export default SubjectManagement;
