import { useEffect, useState } from "react";
import { Card, Grid, Icon } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { addCheckedProp } from "utils";
import GradeApi from "api/GradeApi";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import ModalImport from "components/Modal/ModalImport";
import SelectAllFeature from "components/SelectAllFeature";
import { ErrorAlert } from "components/SweetAlert";
import DataTableCustom from "components/Tables/DataTable/DataTableCustom";
import useGradeManagementStore from "hooks/client/useGradeManagementStore";
import { useGetAllGrades } from "hooks/grades/queries";

import AddCategoryButton from "./components/AddGradeButton";
import SearchBox from "./components/Search";
import gradeTableData from "./data/gradeTableData";

function GradeManagement() {
  /// --------------------- Khai báo Biến, State -------------
  const queryClient = useQueryClient();
  const {
    gradeData,
    columnHeaders,
    currentPageSearch,
    itemsPerPage,
    setGradeData,
    isSubmitSearch,
    searchParams,
    setState
  } = useGradeManagementStore();
  const [, dispatchContext] = useMentorUs();
  const [openModal, setOpenModal] = useState(false);
  const [selectImportUserId, setSelectImportUserId] = useState(null);

  const {
    data: grades,
    isFetching: isLoadingCourse,
    isSuccess: loadSuccessCourse
  } = useGetAllGrades({
    ...searchParams,
    pageSize: itemsPerPage,
    page: currentPageSearch
  });

  const tableData = gradeTableData(gradeData, columnHeaders);
  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm --------------------
  useEffect(() => {
    setGradeData(grades?.data ?? []);
    setState("currentPageSearch", grades?.page ?? 0);
    setState("itemsPerPage", grades?.pageSize ?? 10);
  }, [grades]);

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
        queryKey: ["grades"]
      });
    }
  }, [isSubmitSearch]);

  useEffect(() => {
    if (isLoadingCourse) {
      setLoading(dispatchContext, true);
    } else if (loadSuccessCourse) {
      setLoading(dispatchContext, false);
    }
  }, [isLoadingCourse, loadSuccessCourse]);

  useEffect(() => {
    setState("searchParams", {});
    return function () {
      setState("searchParams", {});
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
          totalPages: grades?.totalPages ?? 0,
          totalItems: grades?.totalCounts ?? 0,
          itemsPerPage,
          handleChangeItemsPerPage,
          handleChangePage
        }}
        headerFilterType="grade"
      />
    );
  };

  const actionImport = async (file) => {
    console.log(selectImportUserId);
    const response = await GradeApi.importGrades(file, selectImportUserId);
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
                      Danh sách điểm số
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
                    {grades && renderTable()}
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
        title="Tải lên danh sách điểm số"
        templateFile={null}
        importAction={(file) => actionImport(file)}
        isSelectUser
        onUserSelectedChange={setSelectImportUserId}
      />
    </DashboardLayout>
  );
}

export default GradeManagement;
