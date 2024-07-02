import { useEffect, useState } from "react";
import { Card, Grid, Icon } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { addCheckedProp } from "utils";
import CourseApi from "api/CourseApi";
import importAccountTemplate from "templates/Import_Account.xlsx";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import ModalImport from "components/Modal/ModalImport";
import SelectAllFeature from "components/SelectAllFeature";
import { ErrorAlert } from "components/SweetAlert";
// import DataTable from "components/Tables/DataTable";
import DataTableCustom from "components/Tables/DataTable/DataTableCustom";
import useSubjectManagementStore from "hooks/client/useSubjectManagementStore";
import { getAllCourse } from "hooks/grades/queries";
import { formatDateExcel } from "utils/formatDate";

import AddCategoryButton from "./components/AddSubjectButton";
import SearchBox from "./components/Search";
import subjectTableData from "./data/subjectTableData";

function SubjectManagement() {
  /// --------------------- Khai báo Biến, State -------------
  const queryClient = useQueryClient();
  const {
    query,
    couseData,
    columnHeaders,
    currentPageSearch,
    itemsPerPage,
    setCourseData,
    isSubmitSearch,
    setState
  } = useSubjectManagementStore();
  const [, dispatchContext] = useMentorUs();
  const [openModal, setOpenModal] = useState(false);

  const {
    data: courses,
    isFetching: isLoadingCourse,
    isSuccess: loadSuccessCourse
  } = getAllCourse({
    query,
    pageSize: itemsPerPage,
    page: currentPageSearch
  });

  const tableData = subjectTableData(couseData, columnHeaders);
  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm --------------------

  useEffect(() => {
    setCourseData(courses?.data ?? []);
    setState("currentPageSearch", courses?.page ?? 0);
    setState("itemsPerPage", courses?.pageSize ?? 10);
  }, [courses]);

  // eslint-disable-next-line no-unused-vars
  const handleChangeItemsPerPage = async (value) => {
    try {
      setState("itemsPerPage", value);
      setState("currentPageSearch", 0);
      setState("isSubmitSearch", true);
    } catch (error) {
      ErrorAlert(error.message);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleChangePage = async (value) => {
    try {
      setState("currentPageSearch", value);
      setState("isSubmitSearch", true);
    } catch (error) {
      ErrorAlert(error.message);
    }
  };
  useEffect(() => {
    if (isSubmitSearch) {
      setState("isSelectAll", false);
      setState("isSubmitSearch", false);
      queryClient.refetchQueries({
        queryKey: ["courses"]
      });
    }
  }, [isSubmitSearch]);

  useEffect(() => {
    console.log("isLoadingCourse");
    console.log(isLoadingCourse);
    if (isLoadingCourse) {
      setLoading(dispatchContext, true);
    } else if (loadSuccessCourse) {
      setLoading(dispatchContext, false);
    }
  }, [isLoadingCourse, loadSuccessCourse]);

  useEffect(() => {
    setState("query", "");
    return function () {
      setState("query", "");
    };
  }, []);

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
  const actionImport = async (file) => {
    const response = await CourseApi.importCourses(file);
    return addCheckedProp(response.data);
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
                    <MDButton onClick={() => setOpenModal(true)} variant="gradient" color="warning">
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
      <ModalImport
        open={openModal}
        closeModal={() => setOpenModal(false)}
        title="Tải lên danh sách môn học"
        templateFile={importAccountTemplate}
        templateFileName={`MentorUS_Import_danh_sách_môn_học_${formatDateExcel()}.xlsx`}
        importAction={(file) => actionImport(file)}
      />
    </DashboardLayout>
  );
}

export default SubjectManagement;
