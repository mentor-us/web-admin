import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Grid,
  Icon,
  TextField
} from "@mui/material";
import { getGroupItemsPerPageSelector, getIsSearchGroupSelector } from "features/groups/selector";
import { searchByButton, searchGroup, updateSearchRequest } from "features/groups/slice";
import { allCategoriesSelector } from "features/groupsCategory/selector";

import { setLoading } from "context";
import dayjs from "dayjs";
import { useMentorUs } from "hooks";
import { calculateDays, getValueOfList, isEmailValid } from "utils";

import CustomCheckbox from "components/Checkbox";
import BasicDatePicker from "components/DatePicker";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert } from "components/SweetAlert";
import { groupStatusList } from "utils/constants";
import { getAnotherDateFromToday } from "utils/formatDate";

import "./styles.css";

function SearchBox() {
  /// --------------------- Khai báo Biến, State -------------

  const isSearch = useSelector(getIsSearchGroupSelector);
  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const listCategories = useSelector(allCategoriesSelector);
  const today = dayjs();
  const [groupName, setGroupName] = useState("");
  const [emailMentor, setEmailMentor] = useState("");
  const [emailMentee, setEmailMentee] = useState("");
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [startDay, setStartDay] = useState({
    from: today,
    to: today
  });
  const [endDay, setEndDay] = useState({
    from: today,
    to: today
  });
  const [startDayEnabled, setStartDayEnabled] = useState(false);
  const [endDayEnabled, setEndDayEnabled] = useState(false);
  const itemsPerPage = useSelector(getGroupItemsPerPageSelector);

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
      dispatch(searchByButton(true));
      await dispatch(searchGroup({ ...request, ...pageChangeInfo })).unwrap();
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
  };

  const isFailCase = () => {
    if (startDayEnabled && startDay.from.isAfter(startDay.to)) {
      ErrorAlert("Thời điểm kết thúc phải lớn hơn hoặc bằng thời điểm bắt đầu!");
      return true;
    }

    if (startDayEnabled && calculateDays(startDay.to, startDay.from) >= 31) {
      ErrorAlert("Khoảng thời gian tìm kiếm phải nhỏ hơn 31 ngày!");
      return true;
    }

    if (endDayEnabled && endDay.from.isAfter(endDay.to)) {
      ErrorAlert("Thời điểm kết thúc phải lớn hơn hoặc bằng thời điểm bắt đầu!");
      return true;
    }
    if (endDayEnabled && calculateDays(endDay.to, endDay.from) >= 31) {
      ErrorAlert("Khoảng thời gian tìm kiếm phải nhỏ hơn 31 ngày!");
      return true;
    }

    if (emailMentor !== "" && !isEmailValid(emailMentor)) {
      ErrorAlert("Email Mentor không hợp lệ!");
      return true;
    }

    if (emailMentee !== "" && !isEmailValid(emailMentee)) {
      ErrorAlert("Email Mentee không hợp lệ!");
      return true;
    }

    return false;
  };

  const makeReqData = () => {
    const req = {};

    if (groupName !== "") {
      req.name = groupName;
    }

    if (category) {
      req.groupCategory = getValueOfList(listCategories, category, "name", "id");
    }

    if (status) {
      req.status = getValueOfList(groupStatusList, status, "label", "textValue");
    }

    if (emailMentee !== "") {
      req.menteeEmail = emailMentee;
    }

    if (emailMentor) {
      req.mentorEmail = emailMentor;
    }

    if (startDayEnabled) {
      req.timeStart1 = startDay.from.startOf("day").toISOString();
      req.timeEnd1 = startDay.to.endOf("day").toISOString();
    }

    if (endDayEnabled) {
      req.timeStart2 = endDay.from.startOf("day").toISOString();
      req.timeEnd2 = endDay.to.endOf("day").toISOString();
    }

    return req;
  };

  const resetAllReqData = () => {
    setGroupName("");
    setEmailMentee("");
    setEmailMentor("");
    setStatus(null);
    setCategory(null);
    setStartDay({
      from: today,
      to: today
    });
    setEndDay({
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

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };
  const handleEmailMentorChange = (e) => {
    setEmailMentor(e.target.value);
  };
  const handleEmailMenteeChange = (e) => {
    setEmailMentee(e.target.value);
  };

  const handleSearch = () => {
    if (!isFailCase()) {
      const request = makeReqData();
      Search(request);
    }
  };

  return (
    <MDBox>
      <Accordion className="group__search-box" style={{ padding: "8px" }}>
        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
          <MDTypography variant="h5" gutterBottom sx={{ mb: 0 }}>
            Tìm kiếm
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container columnSpacing={6} rowSpacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6} lg={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MDBox className="relationship__searchBox-item">
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
                      onChange={handleGroupNameChange}
                      sx={{ width: "70%" }}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDBox className="relationship__searchBox-item">
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                    >
                      Loại nhóm
                    </MDTypography>
                    <Autocomplete
                      noOptionsText="Trống"
                      value={category}
                      onChange={(e, newValue) => {
                        setCategory(newValue);
                      }}
                      sx={{
                        width: "70%",
                        pl: "0!important",
                        pt: "0!important"
                      }}
                      color="text"
                      options={listCategories?.map((option) => option.name)}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Chọn loại nhóm" size="small" />
                      )}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDBox className="relationship__searchBox-item">
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                    >
                      Email Mentor
                    </MDTypography>
                    <MDInput
                      placeholder="Nhập email của mentor"
                      type="email"
                      size="small"
                      sx={{ width: "70%" }}
                      inputProps={{ maxLength: 80 }}
                      value={emailMentor}
                      onChange={handleEmailMentorChange}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDBox className="relationship__searchBox-item">
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                    >
                      Email Mentee
                    </MDTypography>
                    <MDInput
                      inputProps={{ maxLength: 80 }}
                      placeholder="Nhập email của mentee"
                      size="small"
                      sx={{ width: "70%" }}
                      value={emailMentee}
                      onChange={handleEmailMenteeChange}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDBox className="relationship__searchBox-item">
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
                      <CustomCheckbox data={startDayEnabled} action={setStartDayEnabled} />
                      <MDTypography
                        variant="body2"
                        fontWeight="regular"
                        color="dark"
                        sx={{ ml: 2, fontSize: "16px" }}
                      >
                        Thời gian bắt đầu
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      sx={{ width: "100%" }}
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                    >
                      <BasicDatePicker
                        value={startDay}
                        event={setStartDay}
                        type="from"
                        minDate={getAnotherDateFromToday(startDay.from, -4, "year")}
                        maxDate={getAnotherDateFromToday(today, 7, "year")}
                        disabled={!startDayEnabled}
                      />
                      <MDTypography variant="body2" fontWeight="light" sx={{ mx: 1 }}>
                        đến
                      </MDTypography>
                      <BasicDatePicker
                        value={startDay}
                        event={setStartDay}
                        type="to"
                        minDate={getAnotherDateFromToday(startDay.from, 0, "year")}
                        maxDate={getAnotherDateFromToday(startDay.from, 31, "date")}
                        disabled={!startDayEnabled}
                      />
                    </MDBox>
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDBox className="group__searchBox-date">
                    <MDBox sx={{ mb: 2, width: "100%" }} display="flex" alignItems="center">
                      <CustomCheckbox data={endDayEnabled} action={setEndDayEnabled} />
                      <MDTypography
                        variant="body2"
                        fontWeight="regular"
                        color="dark"
                        sx={{ ml: 2, fontSize: "16px" }}
                      >
                        Thời gian kết thúc
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      sx={{ width: "100%" }}
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                    >
                      <BasicDatePicker
                        value={endDay}
                        event={setEndDay}
                        type="from"
                        minDate={getAnotherDateFromToday(endDay.from, -4, "year")}
                        maxDate={getAnotherDateFromToday(today, 7, "year")}
                        disabled={!endDayEnabled}
                      />
                      <MDTypography variant="body2" fontWeight="light" sx={{ mx: 1 }}>
                        đến
                      </MDTypography>
                      <BasicDatePicker
                        value={endDay}
                        event={setEndDay}
                        type="to"
                        minDate={getAnotherDateFromToday(endDay.from, 0, "year")}
                        maxDate={getAnotherDateFromToday(endDay.from, 31, "date")}
                        disabled={!endDayEnabled}
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
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default SearchBox;
