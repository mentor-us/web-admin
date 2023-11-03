import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Grid, Icon } from "@mui/material";

import { numberWithCommas } from "utils";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import InfoNumberWhiteCard from "pages/Statistic/components/InfoNumberWhiteCard";
import PieChart from "components/Charts/PieChart";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import HorizontalTimelineItem from "components/Timeline/HorizontalTimeLine";
import TooltipCustom from "components/Tooltip";
import { groupStatusList } from "utils/constants";
import { formatDate } from "utils/formatDate";

import { getCategoryByNameSelector } from "redux/groupsCategory/selector";
import {
  getStatisticDetailSelector
  // getStatisticDetailTableSelector
} from "redux/statisticDetail/selector";
import { getStatisticDetail, resetState } from "redux/statisticDetail/slice";

import ExportButton from "./components/ExportButton";
import InfoCardChart from "./components/InfoCardChart";
// import statisticDetailTableData from "./data/statisticDetailTableData";
// import ImportComboBox from "./components/ImportComboBox";
import StatisticDetailTable from "./components/StatisticDetailTable";

function StatisticDetail() {
  /// --------------------- Khai báo Biến, State -------------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myState = useSelector((state) => state);
  const { id } = useParams();
  const dataDetail = useSelector(getStatisticDetailSelector);
  // const statisticData = useSelector(getStatisticDetailTableSelector);
  const category = getCategoryByNameSelector(myState, dataDetail?.category);
  const status = groupStatusList.find((item) => item.textValue === dataDetail?.status);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  /// --------------------------------------------------------
  const loadStatistic = async () => {
    try {
      await dispatch(getStatisticDetail(id)).unwrap();
    } catch (error) {
      navigate("/not-found", { replace: true });
    }
  };
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    loadStatistic();
  }, [id]);

  /// --------------------------------------------------------
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={1}>
        <MDBox mb={2} display="flex" justifyContent="center" alignItems="center">
          <TooltipCustom title="Quay lại">
            <MDButton
              variant="outlined"
              color="dark"
              onClick={() => navigate(-1)}
              iconOnly
              circular
            >
              <Icon sx={{ fontWeight: "bold" }}>arrow_back</Icon>
            </MDButton>
          </TooltipCustom>
          <ExportButton groupId={id} />
        </MDBox>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} lg={4}>
            <InfoCardChart
              title={dataDetail?.name}
              subtitle={category?.name}
              iconURL={category?.iconUrl}
            />
          </Grid>
          <Grid item xs={12} md={5} lg={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InfoNumberWhiteCard
                  title="Tình trạng"
                  info={status?.label || ""}
                  iconURL={status?.value === 1 ? "done" : "dangerous"}
                  color={status?.value === 1 ? "success" : "error"}
                  isText
                />
              </Grid>
              <Grid item xs={12}>
                <InfoNumberWhiteCard
                  title="Lần hoạt động gần nhất"
                  info={dataDetail?.lastTimeActive ? formatDate(dataDetail?.lastTimeActive) : ""}
                  iconURL="event_available"
                  color="secondary"
                  isText
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <Card>
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <MDTypography
                  component="h6"
                  color="dark"
                  fontWeight="bold"
                  fontSize="16px"
                  sx={{ pt: 2.5, pb: 0.5 }}
                >
                  Biểu đồ tỷ lệ Mentor/Mentee
                </MDTypography>
                <PieChart
                  chart={{
                    labels: ["Mentor", "Mentee"],
                    datasets: {
                      data: [dataDetail?.totalMentors, dataDetail?.totalMentees]
                    }
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={7} lg={12}>
            <Card>
              <MDBox m={2} px={1} py={2}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                  <Grid item xs={4}>
                    <HorizontalTimelineItem
                      color="error"
                      icon="duo"
                      title="Tổng số cuộc hẹn"
                      info={numberWithCommas(dataDetail?.totalMeetings)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <HorizontalTimelineItem
                      color="info"
                      icon="message"
                      title="Tổng số tin nhắn"
                      info={numberWithCommas(dataDetail?.totalMessages)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <HorizontalTimelineItem
                      color="warning"
                      icon="task"
                      title="Tổng số công việc"
                      info={numberWithCommas(dataDetail?.totalTasks)}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <StatisticDetailTable groupId={id} />
      </MDBox>
    </DashboardLayout>
  );
}

export default StatisticDetail;
