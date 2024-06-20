import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Grid, Icon } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import {
  // getAllCategoriesSearchSelector,
  // getCategoriesSelectAllSelector,
  // getCategoryCurrentPageSearchSelector,
  // getCategoryItemsPerPageSelector,
  // getCategorySearchRequestSelector,
  // getCategorySelectAllSearchSelector,
  // getCategoryTotalItemsSearchSelector,
  // getCategoryTotalPagesSearchSelector,
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
// import DataTable from "components/Tables/DataTable";
import DataTableCustom from "components/Tables/DataTable/DataTableCustom";
import useSubjectManagementStore from "hooks/client/useSubjectManagementStore";
import { getAllCourse } from "hooks/grades/queries";

import AddCategoryButton from "./components/AddCategoryButton";
import SearchBox from "./components/Search";
import subjectTableData from "./data/subjectTableData";

function SubjectManagement() {
  /// --------------------- Khai báo Biến, State -------------
  const queryClient = useQueryClient();
  const isSearch = useSelector(getIsSearchCategorySelector);
  const {
    couseData,
    columnHeaders,
    currentPageSearch,
    itemsPerPage,
    isSelectAll,
    setCourseData,
    setItemsPerPage,
    setState
  } = useSubjectManagementStore();

  const { data: courses } = getAllCourse({
    name: "",
    pageSize: itemsPerPage,
    page: currentPageSearch
  });

  const tableData = subjectTableData(
    couseData,
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
  //   if (isSearch) {
  //     // const pageChangeInfo = {
  //     //   page: 0,
  //     //   size: itemsPerPage
  //     // };
  //     // dispatch(searchCategory({ ...searchRequest, ...pageChangeInfo }));
  //   }
  // }, [totalItemsSearch]);
  useEffect(() => {
    setCourseData(courses?.data ?? []);
    setState("currentPageSearch", courses?.page ?? 0);
    setState("itemsPerPage", courses?.pageSize ?? 10);
  }, [courses]);
  // eslint-disable-next-line no-unused-vars
  const handleChangeItemsPerPage = async (value) => {
    try {
      setItemsPerPage(value);
    } catch (error) {
      ErrorAlert(error.message);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleChangePage = async (value) => {
    try {
      setState("currentPageSearch", value);
    } catch (error) {
      ErrorAlert(error.message);
    }
  };
  useEffect(() => {
    setState("isSelectAll", false);
    queryClient.refetchQueries({
      queryKey: ["courses"]
    });
  }, [itemsPerPage, currentPageSearch]);
  // eslint-disable-next-line no-unused-vars
  const renderTable = () => {
    return (
      <DataTableCustom
        table={tableData}
        isSorted
        noEndBorder={false}
        customPaginationInfo={{
          currentPage: currentPageSearch + 1,
          totalPages: courses?.totalPages ?? 0,
          totalItems: courses?.totalCounts ?? 0,
          itemsPerPage,
          handleChangeItemsPerPage,
          handleChangePage
        }}
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
                    {courses && renderTable()}
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
