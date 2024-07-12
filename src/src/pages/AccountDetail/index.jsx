import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import {
  getAccountDetailColumnHeadersMenteeSelector,
  getAccountDetailColumnHeadersMentorSelector,
  getAccountDetailGroupsByTypeSelector,
  getAccountDetailSelector
} from "features/accountDetail/selector";
import { getAccountDetail, resetState } from "features/accountDetail/slice";

import { getValueOfList } from "utils";
import user from "assets/images/user.png";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import InfoCardDetail from "pages/GroupDetail/components/InfoCardDetail";
import TimeCardDetail from "pages/GroupDetail/components/TimeCardDetail";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import DataTable from "components/Tables/DataTable";
import { accountStatusList, genderList, roleAccountList, roleMemberEnum } from "utils/constants";
import { formatDate } from "utils/formatDate";

import EditDeleteBackBox from "./components/EditDeleteBack";
import ExportButton from "./components/ExportButton";
import GradeDetailAccount from "./components/GradeDetailAccount";
import accountDetailTableData from "./data/accountDetailTableData";

function AccountDetail() {
  /// --------------------- Khai báo Biến, State -------------

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myState = useSelector((state) => state);
  const accountDetail = useSelector(getAccountDetailSelector);
  const mentors = getAccountDetailGroupsByTypeSelector(myState, "MENTOR");
  const mentees = getAccountDetailGroupsByTypeSelector(myState, "MENTEE");
  const columnHeadersMentee = useSelector(getAccountDetailColumnHeadersMenteeSelector);
  const columnHeadersMentor = useSelector(getAccountDetailColumnHeadersMentorSelector);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const loadUserDetail = async () => {
    try {
      await dispatch(getAccountDetail(id)).unwrap();
    } catch (error) {
      navigate("/not-found", { replace: true });
    }
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    loadUserDetail();
  }, [id]);

  /// --------------------------------------------------------

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Grid container direction="column">
          <Grid item xs={12}>
            {Object.keys(accountDetail).length > 0 && <EditDeleteBackBox data={accountDetail} />}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <InfoCardDetail
                  title={accountDetail?.name}
                  subtitle={accountDetail?.email}
                  iconURL={accountDetail?.imageUrl || user}
                  description={
                    `${getValueOfList(
                      roleAccountList,
                      accountDetail?.role,
                      "textValue",
                      "role"
                    )} - ${getValueOfList(
                      genderList,
                      accountDetail?.gender,
                      "textValue",
                      "label"
                    )}` || ""
                  }
                  style={{ height: "10rem" }}
                />
              </Grid>
              <Grid item xs={6} md={3} lg={3}>
                <MDBox display="flex" flexDirection="column">
                  <TimeCardDetail
                    color={accountDetail?.status ? "success" : "error"}
                    icon={accountDetail?.status ? "done" : "dangerous"}
                    time={
                      getValueOfList(accountStatusList, accountDetail?.status, "value", "label") ||
                      ""
                    }
                    title="Trạng thái"
                    style={{ height: "4.5rem" }}
                  />
                  <TimeCardDetail
                    color="error"
                    icon="phone"
                    time={accountDetail?.phone || ""}
                    title="Số điện thoại"
                    style={{ marginTop: "1rem", height: "4.5rem" }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={6} md={3} lg={3}>
                <TimeCardDetail
                  color="warning"
                  icon="cake"
                  time={accountDetail?.birthDate ? formatDate(accountDetail?.birthDate) : ""}
                  title="Ngày sinh"
                  style={{ height: "4.5rem" }}
                />
                <TimeCardDetail
                  color="success"
                  icon="alternate_email"
                  time={accountDetail?.personalEmail || ""}
                  title="Email cá nhân"
                  style={{ marginTop: "1rem", height: "4.5rem" }}
                />
              </Grid>
            </Grid>
            <Grid mt={0.5} container spacing={6}>
              <Grid item xs={12} lg={12}>
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
                      Nhóm quản lý
                    </MDTypography>
                    <ExportButton
                      type={roleMemberEnum.mentor}
                      userId={id}
                      isDisabled={mentors?.length === 0}
                    />
                  </MDBox>
                  <MDBox p={3} pb={0}>
                    <DataTable
                      table={accountDetailTableData(mentors, columnHeadersMentor)}
                      isSorted
                      entriesPerPage
                      showTotalEntries={false}
                      noEndBorder={false}
                      headerFilterType="account-detail-mentor"
                    />
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} lg={12}>
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
                      Nhóm thành viên
                    </MDTypography>
                    <ExportButton
                      type={roleMemberEnum.mentee}
                      userId={id}
                      isDisabled={mentees?.length === 0}
                    />
                  </MDBox>
                  <MDBox p={3} pb={0}>
                    <DataTable
                      table={accountDetailTableData(mentees, columnHeadersMentee)}
                      isSorted
                      entriesPerPage
                      showTotalEntries={false}
                      noEndBorder={false}
                      headerFilterType="account-detail-mentee"
                    />
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} lg={12}>
                <GradeDetailAccount user={accountDetail} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AccountDetail;
