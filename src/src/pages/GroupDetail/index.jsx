import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import {
  getAccountMenteesDetailSelector,
  getAccountMentorsDetailSelector
} from "features/accounts/selector";
import { loadByIds } from "features/accounts/slice";
import {
  getGroupDetail,
  getGroupDetailColumnHeadersMenteeSelector,
  getGroupDetailColumnHeadersMentorSelector
} from "features/groupDetail/selector";
import { getGroup, resetState } from "features/groupDetail/slice";
import { getCategorySelector } from "features/groupsCategory/selector";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import DataTable from "components/Tables/DataTable";
import { groupStatusList, roleMemberEnum } from "utils/constants";
import { formatDate, formatDateFromDuration } from "utils/formatDate";

import AddNewMemberButton from "./components/AddNewMemberButton";
import EditDeleteBackBox from "./components/EditDeleteBackBox";
import ExportButton from "./components/ExportButton";
import InfoCardDetail from "./components/InfoCardDetail";
import TimeCardDetail from "./components/TimeCardDetail";
import groupDetailTable from "./data/groupDetailTable";
import "./style.css";

function GroupDetail() {
  /// --------------------- Khai báo Biến, State -------------

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myState = useSelector((state) => state);
  const groupDetail = useSelector(getGroupDetail);
  const mentees = useSelector(getAccountMenteesDetailSelector);
  const mentors = useSelector(getAccountMentorsDetailSelector);
  const status = groupStatusList.find((item) => item.textValue === groupDetail?.status);
  const category = getCategorySelector(myState, groupDetail?.groupCategory);

  const columnHeadersMentee = useSelector(getGroupDetailColumnHeadersMenteeSelector);
  const columnHeadersMentor = useSelector(getGroupDetailColumnHeadersMentorSelector);

  /// --------------------------------------------------------
  /// --------------------- Các hàm event --------------------

  const loadGroupDetail = async () => {
    try {
      await dispatch(getGroup(id)).unwrap();
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
    loadGroupDetail();
  }, [id]);

  useEffect(() => {
    if (mentees && Array.isArray(groupDetail?.mentees)) {
      if (groupDetail?.mentees.length > 0) {
        if (
          typeof groupDetail.mentees[0] === "string" ||
          groupDetail.mentees[0] instanceof String
        ) {
          dispatch(loadByIds({ req: groupDetail?.mentees, type: roleMemberEnum.mentee }));
        } else {
          dispatch(
            loadByIds({
              req: groupDetail?.mentees.flatMap((mentee) => mentee.id),
              type: roleMemberEnum.mentee
            })
          );
        }
      }
    }
  }, [groupDetail?.mentees]);

  useEffect(() => {
    if (mentors && Array.isArray(groupDetail?.mentors)) {
      if (groupDetail?.mentors.length > 0) {
        if (
          typeof groupDetail.mentors[0] === "string" ||
          groupDetail.mentors[0] instanceof String
        ) {
          dispatch(loadByIds({ req: groupDetail?.mentors, type: roleMemberEnum.mentor }));
        } else {
          dispatch(
            loadByIds({
              req: groupDetail?.mentors.flatMap((mentor) => mentor.id),
              type: roleMemberEnum.mentor
            })
          );
        }
      }
    }
  }, [groupDetail?.mentors]);

  /// --------------------------------------------------------

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Grid container direction="column">
          <Grid item xs={12}>
            {Object.keys(groupDetail).length > 0 && <EditDeleteBackBox data={groupDetail} />}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <InfoCardDetail
                  title={groupDetail?.name}
                  subtitle={category?.name}
                  iconURL={category?.iconUrl}
                  description={groupDetail?.description}
                  style={{ height: "10rem" }}
                />
              </Grid>
              <Grid item xs={6} md={3} lg={3}>
                <MDBox display="flex" flexDirection="column">
                  <TimeCardDetail
                    color="success"
                    icon="event_available"
                    time={formatDate(groupDetail?.timeStart)}
                    title="Thời gian bắt đầu"
                    style={{ height: "4.5rem" }}
                  />
                  <TimeCardDetail
                    color="error"
                    icon="event_busy"
                    time={formatDate(groupDetail?.timeEnd)}
                    title="Thời gian kết thúc"
                    style={{ marginTop: "1rem", height: "4.5rem" }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={6} md={3} lg={3}>
                <TimeCardDetail
                  color="warning"
                  icon="hourglass_top"
                  time={formatDateFromDuration(groupDetail?.duration)}
                  title="Thời hạn"
                  style={{ height: "4.5rem" }}
                />
                <TimeCardDetail
                  color={status?.value === 1 ? "success" : "error"}
                  icon={status?.value === 1 ? "done" : "dangerous"}
                  time={status?.label || ""}
                  title="Tình trạng"
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
                      Danh sách Mentor
                    </MDTypography>
                    <MDBox
                      display="flex"
                      flexDirection="row"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      {groupDetail?.status !== "DELETED" && (
                        <AddNewMemberButton
                          type={roleMemberEnum.mentor}
                          currentMembers={[...mentors, ...mentees]}
                        />
                      )}
                      <ExportButton
                        type={roleMemberEnum.mentor}
                        groupId={id}
                        isDisabled={mentors?.length === 0}
                      />
                    </MDBox>
                  </MDBox>
                  <MDBox p={3} pb={0}>
                    <DataTable
                      table={groupDetailTable(
                        roleMemberEnum.mentor,
                        mentors,
                        columnHeadersMentor,
                        groupDetail?.status === "DELETED"
                      )}
                      isSorted
                      entriesPerPage
                      showTotalEntries={false}
                      noEndBorder={false}
                      headerFilterType="group-detail-mentor"
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
                      Danh sách Mentee
                    </MDTypography>
                    <MDBox
                      display="flex"
                      flexDirection="row"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      {groupDetail?.status !== "DELETED" && (
                        <AddNewMemberButton
                          type={roleMemberEnum.mentee}
                          currentMembers={[...mentors, ...mentees]}
                        />
                      )}
                      <ExportButton
                        type={roleMemberEnum.mentee}
                        groupId={id}
                        isDisabled={mentees?.length === 0}
                      />
                    </MDBox>
                  </MDBox>
                  <MDBox p={3} pb={0}>
                    <DataTable
                      table={groupDetailTable(
                        roleMemberEnum.mentee,
                        mentees,
                        columnHeadersMentee,
                        groupDetail?.status === "DELETED"
                      )}
                      isSorted
                      entriesPerPage
                      showTotalEntries={false}
                      noEndBorder={false}
                      headerFilterType="group-detail-mentee"
                    />
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default GroupDetail;
