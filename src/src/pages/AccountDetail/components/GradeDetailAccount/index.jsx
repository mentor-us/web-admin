import React, { useEffect, useState } from "react";
import { Card, Icon } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import GradeShareModal from "pages/GradeManagement/components/GradeShareModal";
import gradeTableData from "pages/GradeManagement/data/gradeTableData";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert } from "components/SweetAlert";
import DataTableCustom from "components/Tables/DataTable/DataTableCustom";
import useGradeDetailAccountStore from "hooks/client/useGradeDetailAccountStore";
import { useGetAllGrades } from "hooks/grades/queries";

function GradeDetailAccount({ user = null }) {
  if (
    typeof user === "object" &&
    !Array.isArray(user) &&
    user !== null &&
    Object.keys(user).length === 0
  ) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }
  const [openShareModal, setShareModal] = useState();
  console.log("openShareModal");
  console.log(openShareModal);
  const { columnHeaders, currentPageSearch, itemsPerPage, isSubmitSearch, searchParams, setState } =
    useGradeDetailAccountStore();
  const queryClient = useQueryClient();

  const {
    data: grades,
    // eslint-disable-next-line no-unused-vars
    isFetching: isLoadingCourse,
    // eslint-disable-next-line no-unused-vars
    isSuccess: loadSuccessCourse
  } = useGetAllGrades({
    ...searchParams,
    userId: user.id,
    pageSize: itemsPerPage,
    page: currentPageSearch
  });
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
  const tableData = gradeTableData(user ? grades?.data ?? [] : [], columnHeaders);

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

  useEffect(() => {
    if (user) {
      queryClient.refetchQueries({
        queryKey: ["grades"]
      });
    }
  }, [user]);
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h6" color="white" fontSize="20px">
          Bảng điểm
        </MDTypography>
        <MDButton
          sx={{ ml: 1 }}
          onClick={() => {
            console.log("Click share");
            setShareModal(true);
          }}
          variant="gradient"
          color="info"
        >
          <Icon sx={{ fontWeight: "bold" }}>share</Icon>
          <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
            Chia sẻ
          </MDTypography>
        </MDButton>
      </MDBox>
      <MDBox p={3} pb={0}>
        {user && grades && renderTable()}
      </MDBox>
      {openShareModal && <GradeShareModal />}
    </Card>
  );
}
GradeDetailAccount.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired
  // isEditable: PropTypes.bool.isRequired
};
export default GradeDetailAccount;
