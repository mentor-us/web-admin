import React, { useEffect, useReducer, useState } from "react";
import {
  Autocomplete,
  Backdrop,
  Box,
  Divider,
  Fade,
  Icon,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import { useUpdateGradeMutation } from "hooks/grades/mutation";
import { getAllCourse, getAllSemesterOfYear, useGetAllYears } from "hooks/grades/queries";
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
function EditSubjectButton({ data, setState }) {
  /// --------------------- Khai báo Biến, State -------------

  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    year,
    yearInfo,
    semester,
    semesterInfo,
    course,
    courseName,
    score,
    student,
    studentName
  } = state;
  const [firstLoad, setFirstLoad] = useState({
    name: true,
    code: true
  });
  const { data: years } = useGetAllYears(yearInfo.trim());
  const { data: semesters } = getAllSemesterOfYear(semesterInfo.trim());
  const { data: courses } = getAllCourse({
    query: courseName.trim()
  });
  const { data: students } = useGetAllUsers({
    query: studentName.trim()
  });
  const updateGradeMutator = useUpdateGradeMutation();
  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const resetAllData = () => {
    dispatch({ type: "SET_SCORE", payload: data.score });
    dispatch({ type: "SET_COURSE", payload: data.course });
    dispatch({ type: "SET_YEAR", payload: data.year });
    dispatch({ type: "SET_STUDENT", payload: data.student });
    dispatch({ type: "SET_SEMESTER", payload: data.semester });

    setFirstLoad({
      score: true,
      year: true,
      semester: true,
      course: true,
      student: true
    });
  };

  const updateGrade = async (req) => {
    setLoading(dispatchContext, true);

    try {
      await updateGradeMutator.mutateAsync({ id: data.id, ...req });
      SuccessAlert("Chỉnh sửa môn học thành công");
      setState(null);
      setOpen(false);
      setState("currentPageSearch", 0);
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
  };

  const isOneReqDataHasValue = () => {
    return (+score <= 10 && +score >= 0) || year || course || semester || student;
  };

  const isAllReqDataHasValue = () => {
    return +score <= 10 && +score >= 0 && year && course && semester && student;
  };
  const isAllReqDataHasDiffValue = () => {
    return (
      score !== data.score ||
      year !== data.year ||
      course !== data.course ||
      semester !== data.semester ||
      student !== data.student
    );
  };

  const isLostAllData = () => {
    if (isOneReqDataHasValue() && isAllReqDataHasDiffValue()) {
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          setOpen(false);
          resetAllData();
        }
      });
    } else {
      setOpen(false);
      resetAllData();
    }
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => isLostAllData();

  const handleScoreChange = (e) => {
    dispatch({ type: "SET_SCORE", payload: e.target.value });
    setFirstLoad({
      ...firstLoad,
      score: false
    });
  };

  const handleSubmit = () => {
    if (firstLoad.score || !isAllReqDataHasValue()) {
      setFirstLoad({
        score: false,
        year: false,
        semester: false,
        course: false,
        student: false
      });
      return;
    }

    const req = {
      score: +score,
      verified: true,
      studentId: student?.id?.toString() ?? null,
      semesterId: semester?.id?.toString() ?? null,
      schoolYearId: year?.id?.toString() ?? null,
      courseId: course?.id?.toString() ?? null
    };
    updateGrade(req);
  };
  useEffect(() => {
    resetAllData();
  }, []);
  return (
    <>
      <MDBox display="flex" flexDirection="row" onClick={handleOpen} sx={{ width: "100%" }}>
        <Icon fontSize="medium" sx={{ mr: 1 }} color="info">
          edit
        </Icon>
        <MDTypography variant="subtitle2" fontSize="medium" color="info">
          Sửa
        </MDTypography>
      </MDBox>
      <Modal
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box className="group-modal__container">
            <Typography variant="h5" component="h2" textAlign="center" fontSize="25">
              Chỉnh sửa môn học
            </Typography>
            <Divider />
            <MDBox mt={3} mb={2}>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Năm học <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <Autocomplete
                  noOptionsText="Không có thông tin năm học"
                  value={year}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(e, newValue) => {
                    dispatch({ type: "SET_YEAR", payload: newValue });
                    setFirstLoad({
                      ...firstLoad,
                      year: false
                    });
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
                  getOptionLabel={(option) => option?.name || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Chọn năm học"
                      error={!firstLoad.year && !year}
                      helperText={
                        // eslint-disable-next-line no-nested-ternary
                        !firstLoad.year && !year ? "Năm học không được rỗng" : ""
                      }
                      size="small"
                    />
                  )}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Học kỳ <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <Autocomplete
                  noOptionsText="Không có thông tin học kì"
                  value={semester}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(e, newValue) => {
                    dispatch({ type: "SET_SEMESTER", payload: newValue });
                    setFirstLoad({
                      ...firstLoad,
                      semester: false
                    });
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
                  getOptionLabel={(option) => option?.name || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!firstLoad.semester && !semester}
                      helperText={
                        // eslint-disable-next-line no-nested-ternary
                        !firstLoad.semester && !semester ? "Học kì không được rỗng" : ""
                      }
                      placeholder="Chọn học kì"
                      size="small"
                    />
                  )}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Môn học <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <Autocomplete
                  noOptionsText="Không có thông tin môn học"
                  value={course}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(e, newValue) => {
                    dispatch({ type: "SET_COURSE", payload: newValue });
                    setFirstLoad({
                      ...firstLoad,
                      course: false
                    });
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
                    <TextField
                      {...params}
                      error={!firstLoad.course && !course}
                      helperText={
                        // eslint-disable-next-line no-nested-ternary
                        !firstLoad.course && !course ? "Môn học không được rỗng" : ""
                      }
                      placeholder="Chọn môn học"
                      size="small"
                    />
                  )}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Sinh viên <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <Autocomplete
                  noOptionsText="Không có thông tin sinh viên"
                  value={student}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(e, newValue) => {
                    dispatch({ type: "SET_STUDENT", payload: newValue });
                    setFirstLoad({
                      ...firstLoad,
                      student: false
                    });
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
                    <TextField
                      {...params}
                      error={!firstLoad.student && !student}
                      helperText={
                        // eslint-disable-next-line no-nested-ternary
                        !firstLoad.student && !student ? "Sinh viên không được rỗng" : ""
                      }
                      placeholder="Chọn sinh viên"
                      size="small"
                    />
                  )}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Điểm số <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  placeholder="Nhập điểm số"
                  type="number"
                  size="small"
                  sx={{ width: "70%" }}
                  value={score}
                  inputProps={{ maxLength: 100 }}
                  onChange={handleScoreChange}
                  error={(!firstLoad.score && score.length === 0) || +score > 10 || +score < 0}
                  helperText={
                    // eslint-disable-next-line no-nested-ternary
                    !firstLoad.score && score.length === 0
                      ? "Điểm số không được rỗng"
                      : +score > 10 || +score < 0
                      ? "Điểm số phải nằm trong khoảng 0 đến 10"
                      : ""
                  }
                />
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="row" justifyContent="center" mt={4}>
              <MDButton onClick={handleSubmit} variant="contained" color="info" sx={{ mx: 1 }}>
                <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
                  Xác nhận
                </MDTypography>
              </MDButton>
              <MDButton onClick={handleClose} variant="contained" color="error" sx={{ mx: 1 }}>
                <Icon sx={{ fontWeight: "bold" }}>close</Icon>
                <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
                  Hủy
                </MDTypography>
              </MDButton>
            </MDBox>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

EditSubjectButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired
};

export default EditSubjectButton;