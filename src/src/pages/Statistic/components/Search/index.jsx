/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Grid,
  Icon,
  TextField
  // Accordion,
  // AccordionSummary,
  // AccordionDetails
} from "@mui/material";
// import { allCategoriesSelector } from "features/groupsCategory/selector";
import {
  getIsSearchStatisticSelector,
  getStatisticFilterRequestSelector,
  getStatisticFilterValueSelector,
  getStatisticItemsPerPageSelector
} from "features/statistic/selector";
import { searchByButton, searchStatistic, updateSearchRequest } from "features/statistic/slice";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { calculateDays, getValueOfList } from "utils";

import CustomCheckbox from "components/Checkbox";
import BasicDatePicker from "components/DatePicker";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert } from "components/SweetAlert";
import { groupStatusList } from "utils/constants";
import { getAnotherDateFromToday } from "utils/formatDate";

import "./index.css";

function SearchBox() {
  /// --------------------- Khai báo Biến, State -------------
  const today = new Date();
  const isSearch = useSelector(getIsSearchStatisticSelector);
  const [, dispatchContext] = useMentorUs();
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [status, setStatus] = useState(null);
  const [recentActiveDay, setRecentActiveDay] = useState({
    from: today,
    to: today
  });
  const [recentActiveDayEnabled, setRecentActiveDayEnabled] = useState(false);
  const itemsPerPage = useSelector(getStatisticItemsPerPageSelector);
  const filterValue = useSelector(getStatisticFilterValueSelector);
  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------
  const Search = async (request) => {
    setLoading(dispatchContext, true);
    const pageChangeInfo = {
      page: 0,
      size: itemsPerPage
    };
    try {
      dispatch(updateSearchRequest(request));

      await dispatch(searchStatistic({ ...request, ...pageChangeInfo })).unwrap();
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }
    setLoading(dispatchContext, false);
  };

  const makeReqData = () => {
    const req = {};
    if (groupName !== "") {
      req.groupName = groupName;
    }
    if (status) {
      req.status = getValueOfList(groupStatusList, status, "label", "textValue");
    }
    if (recentActiveDayEnabled) {
      req.timeStart = new Date(recentActiveDay.from.setUTCHours(0, 0, 0, 0)).toISOString();
      req.timeEnd = new Date(recentActiveDay.to.setUTCHours(23, 59, 59, 999)).toISOString();
    }
    if (filterValue !== "") {
      req.groupCategory = filterValue;
    }
    return req;
  };

  const isFailCase = () => {
    // Kiểm tra các trường hợp fail

    if (recentActiveDay.from.getTime() > recentActiveDay.to.getTime()) {
      ErrorAlert("Thời điểm kết thúc phải lớn hơn hoặc bằng thời điểm bắt đầu!");
      return true;
    }
    if (calculateDays(recentActiveDay.to, recentActiveDay.from) >= 31) {
      ErrorAlert("Khoảng thời gian tìm kiếm phải nhỏ hơn 31 ngày!");
      return true;
    }
    return false;
  };

  const resetAllReqData = () => {
    setGroupName("");
    setStatus(null);
    setRecentActiveDay({
      from: today,
      to: today
    });
  };
  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    if (!isSearch) {
      resetAllReqData();
    }
  }, [isSearch]);

  const handleChangeGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const handleSearch = () => {
    if (!isFailCase()) {
      const request = makeReqData();
      Search(request);
    }
  };

  return (
    <MDBox className="statistic_search-container">
      {/* <Accordion className="statistic__search-box" style={{ padding: "8px" }}>
        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}> */}
      {/* <MDTypography variant="h5" gutterBottom sx={{ mb: 0 }}>
        Tìm kiếm
      </MDTypography> */}
      {/* </AccordionSummary> */}
      {/* <AccordionDetails> */}
      <MDTypography variant="h5" className="statistic_search-container-label">
        Tìm kiếm
      </MDTypography>
      <MDBox className="statistic_search-container-searchBox">
        <Grid container columnSpacing={6} rowSpacing={3} sx={{ mb: 3, mt: -0.5 }}>
          <Grid item xs={12} md={6} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDBox className="statistic__searchBox-item">
                  <MDTypography
                    variant="body2"
                    fontWeight="regular"
                    color="dark"
                    sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                  >
                    Tên nhóm
                  </MDTypography>
                  <MDInput
                    placeholder="Nhập tên nhóm"
                    size="small"
                    value={groupName}
                    onChange={handleChangeGroupName}
                    sx={{ width: "70%" }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox className="statistic__searchBox-item">
                  <MDTypography
                    variant="body2"
                    fontWeight="regular"
                    color="dark"
                    sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                  >
                    Trạng thái
                  </MDTypography>
                  <Autocomplete
                    noOptionsText="Trống"
                    value={status}
                    onChange={(e, newValue) => {
                      setStatus(newValue);
                    }}
                    // isOptionEqualToValue={(option, newValue) => {
                    //   return option.id === newValue.id;
                    // }}
                    sx={{
                      width: "70%",
                      pl: "0!important",
                      pt: "0!important"
                    }}
                    options={groupStatusList.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Chọn trạng thái" size="small" />
                    )}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDBox className="group__searchBox-date">
                  <MDBox sx={{ mb: 2, width: "100%" }} display="flex" alignItems="center">
                    <CustomCheckbox
                      data={recentActiveDayEnabled}
                      action={setRecentActiveDayEnabled}
                    />
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      sx={{ mx: 2, fontSize: "16px" }}
                    >
                      Lần hoạt động gần nhất
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    sx={{ width: "100%" }}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <BasicDatePicker
                      value={recentActiveDay}
                      event={setRecentActiveDay}
                      type="from"
                      minDate={getAnotherDateFromToday(new Date(recentActiveDay.from), -4, "year")}
                      maxDate={getAnotherDateFromToday(new Date(), 7, "year")}
                      disabled={!recentActiveDayEnabled}
                    />
                    <MDTypography variant="body2" fontWeight="light" sx={{ mx: 1 }}>
                      đến
                    </MDTypography>
                    <BasicDatePicker
                      value={recentActiveDay}
                      event={setRecentActiveDay}
                      type="to"
                      minDate={getAnotherDateFromToday(new Date(recentActiveDay.from), 0, "year")}
                      maxDate={getAnotherDateFromToday(new Date(recentActiveDay.from), 31, "date")}
                      disabled={!recentActiveDayEnabled}
                    />
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <MDBox
          mt={1}
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <MDButton variant="contained" color="info" onClick={handleSearch}>
            <Icon sx={{ fontWeight: "bold" }}>search</Icon>
            <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
              Tìm kiếm
            </MDTypography>
          </MDButton>
        </MDBox>
      </MDBox>
      {/* </AccordionDetails> */}
      {/* </Accordion> */}
    </MDBox>
  );
}

export default SearchBox;
