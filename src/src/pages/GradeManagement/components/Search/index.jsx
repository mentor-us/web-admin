import React, { useEffect, useReducer } from "react";
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
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert } from "components/SweetAlert";
import useGradeManagementStore from "hooks/client/useGradeManagementStore";
import { getAllSemesterOfYear, useGetAllYears } from "hooks/grades/queries";
import { useGetAllUsers } from "hooks/users/queries";

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
  const { year, yearInfo, semester, semesterInfo, student, studentName } = state;

  const { data: years } = useGetAllYears(yearInfo.trim());
  const { data: semesters } = getAllSemesterOfYear(semesterInfo.trim());
  // const { data: courses } = getAllCourse({
  //   query: courseName.trim()
  // });
  const { data: students } = useGetAllUsers({
    query: studentName.trim()
  });
  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------
  const { setState } = useGradeManagementStore();

  const Search = async () => {
    setLoading(dispatchContext, true);

    const params = {
      userId: student?.id ?? null,
      semester: semester ?? null,
      year: year ?? null
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
              <MDBox className="relationship__searchBox-item">
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                >
                  Năm học
                </MDTypography>
                <Autocomplete
                  noOptionsText="Không có thông tin năm học"
                  value={year}
                  // isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(e, newValue) => {
                    dispatch({ type: "SET_YEAR", payload: newValue });
                  }}
                  onInputChange={(event, value) => {
                    dispatch({ type: "SET_YEAR_INFO", payload: value });
                  }}
                  sx={{
                    width: "70%",
                    pl: "0!important",
                    pt: "0!important"
                  }}
                  color="text"
                  // disableClearable
                  // eslint-disable-next-line no-shadow
                  options={years ?? []}
                  getOptionLabel={(option) => option || ""}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Chọn năm học" size="small" />
                  )}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox className="relationship__searchBox-item">
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                >
                  Học kỳ
                </MDTypography>
                <Autocomplete
                  noOptionsText="Không có thông tin học kì"
                  value={semester}
                  onChange={(e, newValue) => {
                    dispatch({ type: "SET_SEMESTER", payload: newValue });
                  }}
                  onInputChange={(event, value) => {
                    dispatch({ type: "SET_SEMESTER_INFO", payload: value });
                  }}
                  sx={{
                    width: "70%",
                    pl: "0!important",
                    pt: "0!important"
                  }}
                  color="text"
                  options={semesters ?? []}
                  getOptionLabel={(option) => option || ""}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Chọn học kì" size="small" />
                  )}
                />
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={6}>
              <MDBox className="relationship__searchBox-item">
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                >
                  Môn học
                </MDTypography>
                <Autocomplete
                  noOptionsText="Không có thông tin môn học"
                  value={course}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(e, newValue) => {
                    dispatch({ type: "SET_COURSE", payload: newValue });
                  }}
                  onInputChange={(event, value) => {
                    dispatch({ type: "SET_COURSE_NAME", payload: value });
                  }}
                  sx={{
                    width: "70%",
                    pl: "0!important",
                    pt: "0!important"
                  }}
                  color="text"
                  options={courses?.data ?? []}
                  getOptionLabel={(option) => option?.name || ""}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Chọn môn học" size="small" />
                  )}
                />
              </MDBox>
            </Grid> */}
            <Grid item xs={12} md={6} lg={6}>
              <MDBox className="relationship__searchBox-item">
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                >
                  Sinh viên
                </MDTypography>
                <Autocomplete
                  noOptionsText="Không có thông tin sinh viên"
                  value={student}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(e, newValue) => {
                    dispatch({ type: "SET_STUDENT", payload: newValue });
                  }}
                  onInputChange={(event, value) => {
                    dispatch({ type: "SET_STUDENT_NAME", payload: value });
                  }}
                  sx={{
                    width: "70%",
                    pl: "0!important",
                    pt: "0!important"
                  }}
                  color="text"
                  options={students ?? []}
                  getOptionLabel={(option) => option?.name || ""}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Chọn sinh viên" size="small" />
                  )}
                />
              </MDBox>
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
