import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsSearchStatisticDetailSelector } from "features/statisticDetail/selector";
import { searchStatisticDetail, updateSearchRequest } from "features/statisticDetail/slice";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { calculateDays, getValueOfList } from "utils";

import CustomCheckbox from "components/Checkbox";
import BasicDatePicker from "components/DatePicker";
import { ErrorAlert } from "components/SweetAlert";
import { getAnotherDateFromToday } from "utils/formatDate";

const {
  // Accordion,
  // AccordionSummary,
  Icon,
  // AccordionDetails,
  Grid,
  TextField,
  Autocomplete
} = require("@mui/material");
const { default: MDBox } = require("components/MDComponents/MDBox");
const { default: MDButton } = require("components/MDComponents/MDButton");
const { default: MDInput } = require("components/MDComponents/MDInput");
const { default: MDTypography } = require("components/MDComponents/MDTypography");
const { roleMemberList } = require("utils/constants");

function SearchBox({ groupId }) {
  /// --------------------- Khai báo Biến, State -------------
  const today = new Date();
  const [email, setEmail] = useState("");
  const [memberName, setMemberName] = useState("");
  const [role, setRole] = useState(null);
  const [, dispatchContext] = useMentorUs();
  const dispatch = useDispatch();
  const isSearch = useSelector(getIsSearchStatisticDetailSelector);
  const [recentActiveDayEnabled, setRecentActiveDayEnabled] = useState(false);
  const [recentActiveDay, setRecentActiveDay] = useState({
    from: today,
    to: today
  });
  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------
  const makeReqData = () => {
    const req = {};

    if (email) {
      req.email = email;
    }
    if (memberName !== "") {
      req.name = memberName;
    }
    if (role) {
      req.role = getValueOfList(roleMemberList, role, "role", "textValue");
    }
    if (recentActiveDayEnabled) {
      req.timeStart = new Date(recentActiveDay.from.setUTCHours(0, 0, 0, 0)).toISOString();
      req.timeEnd = new Date(recentActiveDay.to.setUTCHours(23, 59, 59, 999)).toISOString();
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

  const Search = async (request) => {
    setLoading(dispatchContext, true);
    try {
      dispatch(updateSearchRequest(request));
      await dispatch(searchStatisticDetail({ id: groupId, req: request })).unwrap();
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
  };
  const resetAllReqData = () => {
    setEmail("");
    setMemberName("");
    setRole(null);
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
  const handleSearch = () => {
    if (!isFailCase()) {
      const request = makeReqData();
      Search(request);
    }
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeFullName = (e) => {
    setMemberName(e.target.value);
  };

  return (
    <MDBox className="statistic_search-container">
      {/* <Accordion className="statistic__search-box" style={{ padding: "8px" }}>
        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
          <MDTypography variant="h5" gutterBottom sx={{ mb: 0 }}>
            Tìm kiếm
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails> */}
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
                    Email
                  </MDTypography>
                  <MDInput
                    placeholder="Nhập Email"
                    size="small"
                    value={email}
                    onChange={handleChangeEmail}
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
                    Họ tên
                  </MDTypography>
                  <MDInput
                    placeholder="Nhập họ và tên"
                    size="small"
                    value={memberName}
                    onChange={handleChangeFullName}
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
                    Vai trò
                  </MDTypography>
                  <Autocomplete
                    noOptionsText="Trống"
                    value={role}
                    onChange={(e, newValue) => {
                      setRole(newValue);
                    }}
                    sx={{
                      width: "70%",
                      pl: "0!important",
                      pt: "0!important"
                    }}
                    options={roleMemberList?.map((option) => option.role)}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Chọn vai trò" size="small" />
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

      {/* </AccordionDetails>
      </Accordion> */}
    </MDBox>
  );
}
SearchBox.propTypes = {
  groupId: PropTypes.string.isRequired
};
export default SearchBox;
