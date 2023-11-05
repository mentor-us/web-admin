/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Card, Grid, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  getIsFilterStatisticSelector,
  getStatisticByMonthSelector,
  getStatisticFilterValueSelector,
  getStatisticGeneralByGroupCategorySelector,
  getStatisticGeneralSelector
} from "features/statistic/selector";
import { getByMonth } from "features/statistic/slice";

import dayjs, { Dayjs } from "dayjs";
// import pdf from "assets/images/pdf.png";
import { numberWithCommas } from "utils";

import ReportsBarChart from "components/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "components/Charts/LineCharts/ReportsLineChart";
import BasicDatePicker from "components/DatePicker";
// import JsPDF from "jspdf";
import MDBox from "components/MDComponents/MDBox";
import MDInput from "components/MDComponents/MDInput";
// import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";

import InfoNumberCard from "../InfoNumberCard";
import InfoNumberWhiteCard from "../InfoNumberWhiteCard";

function StatisticNumberAndChart() {
  /// --------------------- Khai báo Biến, State -------------
  let dataStatistic = {
    activeGroups: 0,
    activeUsers: 0,
    totalGroups: 0,
    totalMeetings: 0,
    totalMessages: 0,
    totalTasks: 0,
    totalUsers: 0
  };
  const allData = useSelector(getStatisticGeneralSelector);
  const today = new Date();
  const initYear = today.getFullYear();
  const [year, setYear] = useState(dayjs(today));
  const [yearStatistic, setYearStatistic] = useState(initYear);
  const dataByMonth = useSelector(getStatisticByMonthSelector);
  const filterValue = useSelector(getStatisticFilterValueSelector);
  const dispatch = useDispatch();
  const monthStartStatistic = 1;
  const monthEndStatistic = 12;

  const byMonthDataStatistic = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: "Số lượng nhóm mới",
        data: dataByMonth.map((item) => item.newGroups)
      },
      {
        label: "Số lượng cuộc hẹn",
        data: dataByMonth.map((item) => item.newMeetings)
      },
      {
        label: "Số lượng tin nhắn",
        data: dataByMonth.map((item) => item.newMessages)
      },
      {
        label: "Số lượng công việc mới",
        data: dataByMonth.map((item) => item.newTasks)
      },
      {
        label: "Số lượng người dùng mới",
        data: dataByMonth.map((item) => item.newUsers)
      }
    ]
  };

  dataStatistic = allData;
  const generalDataStatistic = {
    labels: [
      "Tổng số nhóm",
      "Các nhóm đang hoạt động",
      "Tổng số tài khoản",
      "Các tài khoản hoạt động"
    ],
    datasets: {
      data: [
        dataStatistic.totalGroups,
        dataStatistic.activeGroups,
        dataStatistic.totalUsers,
        dataStatistic.activeUsers
      ]
    },
    title: "Biểu đồ hoạt động tổng"
  };

  // function to get by month data
  const getByMonthData = () => {
    if (filterValue !== "") {
      dispatch(
        getByMonth({
          monthStart: monthStartStatistic,
          monthEnd: monthEndStatistic,
          yearStart: yearStatistic,
          yearEnd: yearStatistic,
          groupCategoryId: filterValue
        })
      );
    } else {
      dispatch(
        getByMonth({
          monthStart: monthStartStatistic,
          monthEnd: monthEndStatistic,
          yearStart: yearStatistic,
          yearEnd: yearStatistic
          // without filter value
        })
      );
    }
  };
  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  //   const handleDownloadPDF = () => {
  //     const report = new JsPDF("landscape", "px", "a4");
  //     report.html(document.querySelector("#report")).then(() => {
  //       report.save("MentorUS_Report.pdf");
  //     });
  //   };
  const handleChangeYearStatistic = (newValue) => {
    setYear(dayjs(newValue));
    setYearStatistic(newValue?.$y);
  };

  useEffect(() => {
    getByMonthData();
  }, [filterValue, yearStatistic]);
  // console.log(year.$y);
  /// --------------------------------------------------------

  return (
    <MDBox display="flex" flexDirection="column">
      {/* <MDButton
        onClick={handleDownloadPDF}
        variant="outlined"
        color="error"
        sx={{
          padding: "7px 15px!important",
          mb: 1,
          alignSelf: "center"
        }}
      >
        <img
          src={pdf}
          alt=""
          style={{ objectFit: "contain", width: "30px", marginRight: "10px" }}
        />
        <MDTypography
          fontSize="16px"
          style={{
            cursor: "pointer",
            width: "fit-content",
            textTransform: "none!important"
          }}
        >
          Xuất hoạt động
        </MDTypography>
      </MDButton> */}
      <MDBox id="report">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
          pt={1}
        >
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <InfoNumberCard
                  title="Tổng số nhóm"
                  info={numberWithCommas(dataStatistic.totalGroups)}
                  iconURL="diversity_1"
                  style={{
                    background: "linear-gradient(135deg, rgb(56, 184, 242), rgb(132, 60, 246))"
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <InfoNumberCard
                  title="Các nhóm đang hoạt động"
                  info={numberWithCommas(dataStatistic.activeGroups)}
                  iconURL="diversity_2"
                  style={{
                    background: "linear-gradient(90deg, #B2A4FF, #AA77FF)"
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <InfoNumberCard
                  title="Tổng số tài khoản"
                  info={numberWithCommas(dataStatistic.totalUsers)}
                  iconURL="badge"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <InfoNumberCard
                  title="Các tài khoản hoạt động"
                  info={numberWithCommas(dataStatistic.activeUsers)}
                  iconURL="person_pin"
                  style={{
                    background: "linear-gradient(90deg, rgb(163, 234, 211), rgb(59, 210, 162))"
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox px={7}>
                <ReportsBarChart color="none" height="18rem" chart={generalDataStatistic} />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} lg={4}>
                <InfoNumberWhiteCard
                  title="Tổng số cuộc hẹn"
                  info={numberWithCommas(dataStatistic.totalMeetings)}
                  iconURL="duo"
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <InfoNumberWhiteCard
                  title="Tổng số tin nhắn"
                  info={numberWithCommas(dataStatistic.totalMessages)}
                  iconURL="message"
                  color="info"
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <InfoNumberWhiteCard
                  title="Tổng số công việc"
                  info={numberWithCommas(dataStatistic.totalTasks)}
                  iconURL="task"
                  color="warning"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ py: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <MDBox display="flex" flexDirection="column" alignItems="center">
                    <MDTypography
                      component="h6"
                      color="dark"
                      fontWeight="bold"
                      fontSize="20px"
                      sx={{ py: 1 }}
                    >
                      Biểu đồ hoạt động theo tháng
                    </MDTypography>
                    <MDBox px={2} pt={1}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year"]}
                          openTo="year"
                          label="Năm"
                          value={year}
                          onChange={(value) => {
                            handleChangeYearStatistic(value);
                          }}
                          minDate={new Date().setFullYear(2023)}
                          maxDate={new Date()}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </MDBox>
                  </MDBox>
                  <MDBox pl={5} pr={2} display="flex" flexDirection="column" alignItems="stretch">
                    <ReportsLineChart color="none" height="19rem" chart={byMonthDataStatistic} />
                    <MDTypography
                      variant="caption"
                      sx={{ alignSelf: "center", mt: -1, pb: 2, fontSize: "0.85rem" }}
                    >
                      <i>
                        <span style={{ color: "red" }}>(*)</span> Nhấn vào các ô bên phải để ẩn số
                        liệu trên biểu đồ
                      </i>
                    </MDTypography>
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default StatisticNumberAndChart;
