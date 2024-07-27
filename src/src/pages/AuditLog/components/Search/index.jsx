/* eslint-disable simple-import-sort/imports */
/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Grid,
  Icon,
  TextField
} from "@mui/material";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert } from "components/SweetAlert";
import useGradeManagementStore from "hooks/client/useGradeManagementStore";
import { getAllCourse, getAllSemesterOfYear, useGetAllYears } from "hooks/grades/queries";
import { useGetAllUsers } from "hooks/users/queries";
import BasicDatePicker from "components/DatePicker";
import CustomCheckbox from "components/Checkbox";
import dayjs from "dayjs";
import { actionTypeMap, domainTypeMap } from "hooks/client/useAuditLogStore.ts";

const initState = {
  year: null,
  yearInfo: "",
  semester: null,
  semesterInfo: "",
  course: null,
  courseName: "",
  score: 0,
  student: null,
  studentName: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "SET_YEAR_INFO":
      return { ...state, yearInfo: action.payload };
    case "SET_SEMESTER":
      return { ...state, semester: action.payload };
    case "SET_SEMESTER_INFO":
      return { ...state, semesterInfo: action.payload };
    case "SET_COURSE":
      return { ...state, course: action.payload };
    case "SET_COURSE_NAME":
      return { ...state, courseName: action.payload };
    case "SET_STUDENT":
      return { ...state, student: action.payload };
    case "SET_STUDENT_NAME":
      return { ...state, studentName: action.payload };
    case "SET_SCORE":
      return { ...state, score: action.payload };
    default:
      return state;
  }
}
function SearchBox() {
  /// --------------------- Khai báo Biến, State -------------

  const [, dispatchContext] = useMentorUs();
  const [state, dispatch] = useReducer(reducer, initState);
  const { year, yearInfo, semester, semesterInfo, course, courseName, student, studentName } =
    state;

  // const { data: years } = useGetAllYears(yearInfo.trim());
  const { data: semesters } = getAllSemesterOfYear(semesterInfo.trim());
  const { data: courses } = getAllCourse({
    query: courseName.trim()
  });
  const { data: students } = useGetAllUsers({
    query: studentName.trim()
  });
  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------
  const { setState } = useGradeManagementStore();
  const today = dayjs();
  const [searchParams, setSearchParams] = useState({
    name: "",
    email: "",
    domain: "",
    action: "",
    isFilterByCreatedDate: false,
    createdDateRange: {
      from: today,
      to: today
    }
  });

  const Search = async () => {
    setLoading(dispatchContext, true);

    const params = {
      userId: student?.id ?? null,
      courseId: course?.id ?? null,
      semesterId: semester?.id ?? null,
      yearId: year?.id ?? null
    };

    try {
      setState("currentPageSearch", 0);
      setState("searchParams", params);
      setState("isSubmitSearch", true);
      // await dispatch(searchGrade({ ...request, ...pageChangeInfo })).unwrap();
    } catch (error) {
      ErrorAlert(error?.message);
    }

    setLoading(dispatchContext, false);
  };

  const resetAllReqData = () => {
    dispatch({ type: "SET_COURSE", payload: null });
    dispatch({ type: "SET_YEAR", payload: null });
    dispatch({ type: "SET_STUDENT", payload: null });
    dispatch({ type: "SET_SEMESTER", payload: null });
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    resetAllReqData();
  }, []);

  return (
    <MDBox>
      <Accordion className="group__search-box" style={{ padding: "8px" }}>
        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
          <MDTypography variant="h5" gutterBottom sx={{ mb: 0 }}>
            Tìm kiếm
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container columnSpacing={10} rowSpacing={3} sx={{ mb: 2 }}>
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
                      Tên người dùng
                    </MDTypography>
                    <MDInput
                      placeholder="Nhập tên người dùng"
                      size="small"
                      value={searchParams.name}
                      onChange={() => setSearchParams((prev) => ({ ...prev, name: prev.name }))}
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
                      Email
                    </MDTypography>
                    <MDInput
                      placeholder="Nhập email"
                      size="small"
                      value={searchParams.email}
                      onChange={() => setSearchParams((prev) => ({ ...prev, email: prev.email }))}
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
                      Loại đối tượng
                    </MDTypography>
                    <Autocomplete
                      noOptionsText="Trống"
                      onChange={(e, newValue) => {
                        setSearchParams((prev) => ({ ...prev, domain: newValue?.value }));
                      }}
                      sx={{
                        width: "70%",
                        pl: "0!important",
                        pt: "0!important"
                      }}
                      options={Object.entries(domainTypeMap).map(([key, value]) => ({
                        value: key,
                        label: value
                      }))}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      getOptionKey={(option) => option.value}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Chọn loại đối tượng" size="small" />
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
                      Loại hành động
                    </MDTypography>
                    <Autocomplete
                      noOptionsText="Trống"
                      onChange={(e, newValue) => {
                        setSearchParams((prev) => ({ ...prev, action: newValue?.value }));
                      }}
                      sx={{
                        width: "70%",
                        pl: "0!important",
                        pt: "0!important"
                      }}
                      options={Object.entries(actionTypeMap).map(([key, value]) => ({
                        value: key,
                        label: value
                      }))}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      getOptionKey={(option) => option.value}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Chọn loại hành động" size="small" />
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
                        data={searchParams.isFilterByCreatedDate}
                        action={() =>
                          setSearchParams((prev) => ({
                            ...prev,
                            isFilterByCreatedDate: !prev.isFilterByCreatedDate
                          }))
                        }
                      />
                      <MDTypography
                        variant="body2"
                        fontWeight="regular"
                        color="dark"
                        sx={{ ml: 2, fontSize: "16px" }}
                      >
                        Ngày thực hiện
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      sx={{ width: "100%" }}
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                    >
                      <BasicDatePicker
                        value={searchParams.createdDateRange}
                        // event={setStartDay}
                        type="from"
                        // minDate={getAnotherDateFromToday(startDay.from, -4, "year")}
                        // maxDate={getAnotherDateFromToday(today, 7, "year")}
                        // disabled={!startDayEnabled}
                      />
                      <MDTypography variant="body2" fontWeight="light" sx={{ mx: 1 }}>
                        đến
                      </MDTypography>
                      <BasicDatePicker
                        value={searchParams.createdDateRange}
                        // event={setStartDay}
                        type="to"
                        // minDate={getAnotherDateFromToday(startDay.from, 0, "year")}
                        // maxDate={getAnotherDateFromToday(startDay.from, 31, "date")}
                        // disabled={!startDayEnabled}
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
            <MDButton variant="contained" color="info" onClick={Search}>
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
