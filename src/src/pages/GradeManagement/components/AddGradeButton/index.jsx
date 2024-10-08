/* eslint-disable no-unused-vars */
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
import { useQueryClient } from "@tanstack/react-query";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { isNumber } from "utils";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import useGradeManagementStore from "hooks/client/useGradeManagementStore";
import { useCreateGradeMutation } from "hooks/grades/mutation";
import { useGetAllUsers } from "hooks/users/queries";

const initState = {
  year: null,
  yearInfo: "",
  semester: 1,
  semesterInfo: "",
  course: null,
  courseCode: "",
  score: 0,
  value: "",
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
    case "SET_COURSE_CODE":
      return { ...state, courseCode: action.payload };
    case "SET_STUDENT":
      return { ...state, student: action.payload };
    case "SET_STUDENT_NAME":
      return { ...state, studentName: action.payload };
    case "SET_SCORE":
      return { ...state, score: action.payload };
    case "SET_VALUE":
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

const AcceptValue = ["A", "B", "C", "D", "A+", "B-", "C+", "D-", "A-", "B+", "C-", "D+"];

function AddGradeButton() {
  /// --------------------- Khai báo Biến, State -------------
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    year,
    // yearInfo,
    semester,
    // semesterInfo,
    course,
    courseCode,
    courseName,
    score,
    student,
    studentName,
    value: scoreValue
  } = state;

  const { setState } = useGradeManagementStore();
  const [firstLoad, setFirstLoad] = useState({
    score: true,
    year: true,
    semester: true,
    course: true,
    courseCode: true,
    student: true,
    value: true
  });
  const queryClient = useQueryClient();
  const createGradeMutator = useCreateGradeMutation();
  // const { data: years } = useGetAllYears(yearInfo.trim());
  // const { data: semesters } = getAllSemesterOfYear(semesterInfo.trim());
  // const { data: courses } = getAllCourse({
  //   query: courseName.trim()
  // });
  const { data: students } = useGetAllUsers({
    query: studentName.trim()
  });
  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const resetAllData = () => {
    dispatch({ type: "SET_SCORE", payload: 0 });
    dispatch({ type: "SET_COURSE", payload: null });
    dispatch({ type: "SET_COURSE_CODE", payload: null });
    dispatch({ type: "SET_YEAR", payload: null });
    dispatch({ type: "SET_STUDENT", payload: null });
    dispatch({ type: "SET_SEMESTER", payload: 1 });
    dispatch({ type: "SET_VALUE", payload: null });
    setFirstLoad({
      score: true,
      year: true,
      semester: true,
      course: true,
      courseCode: true,
      student: true,
      value: true
    });
  };

  // eslint-disable-next-line no-unused-vars
  const addGrade = async (grade) => {
    setLoading(dispatchContext, true);

    try {
      // await dispatch(addNewGrade(req)).unwrap();
      await createGradeMutator.mutateAsync(grade);
      SuccessAlert("Thêm điểm số thành công");
      setOpen(false);
      resetAllData();
      setState("currentPageSearch", 0);
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
  };

  const isOneReqDataHasValue = () => {
    return score || year || course || courseCode || semester !== 1 || student;
  };

  const isAllReqDataHasValue = () => {
    return (
      +score <= 10 &&
      +score >= 0 &&
      year?.trim() &&
      course?.trim() &&
      semester &&
      student &&
      courseCode?.trim()
    );
  };

  const isLostAllData = () => {
    if (isOneReqDataHasValue()) {
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => isLostAllData();

  const handleScoreChange = (e) => {
    dispatch({ type: "SET_SCORE", payload: e.target.value });
    setFirstLoad({
      ...firstLoad,
      score: false
    });
  };

  const handleSubmit = async () => {
    if (firstLoad.score || !isAllReqDataHasValue()) {
      setFirstLoad({
        score: false,
        year: false,
        semester: false,
        course: false,
        student: false,
        value: false
      });
      return;
    }
    const req = {
      score: +score,
      studentId: student?.id?.toString() ?? null,
      semester: +semester,
      year: year?.toString()?.trim() ?? null,
      courseName: course?.toString()?.trim() ?? null,
      courseCode: courseCode?.toString()?.trim() ?? null,
      value: scoreValue?.toString()?.trim() ?? null
    };
    addGrade(req);
  };
  useEffect(() => {
    queryClient.refetchQueries({
      queryKey: ["courses"]
    });
  }, [courseName]);
  useEffect(() => {
    resetAllData();
  }, []);

  return (
    <>
      <MDButton variant="gradient" color="success" onClick={handleOpen}>
        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
          Thêm
        </MDTypography>
      </MDButton>
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
              Thêm mới điểm số
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
                <MDInput
                  placeholder="Nhập năm học"
                  size="small"
                  sx={{ width: "70%" }}
                  value={year}
                  inputProps={{ maxLength: 100 }}
                  onChange={(e) => {
                    dispatch({ type: "SET_YEAR", payload: e.target.value });
                    setFirstLoad({
                      ...firstLoad,
                      year: false
                    });
                  }}
                  error={!firstLoad.year && (!year || !year.trim())}
                  helperText={
                    // eslint-disable-next-line no-nested-ternary
                    !firstLoad.year && (!year || !year.trim()) ? "Năm học không được rỗng" : ""
                  }
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
                <MDInput
                  placeholder="Nhập học kỳ"
                  size="small"
                  // type="number"
                  sx={{ width: "70%" }}
                  value={semester}
                  inputProps={{ maxLength: 100 }}
                  onChange={(e) => {
                    dispatch({ type: "SET_SEMESTER", payload: e.target.value });
                    setFirstLoad({
                      ...firstLoad,
                      semester: false
                    });
                  }}
                  error={(!firstLoad.semester && !semester) || (semester && !isNumber(semester))}
                  helperText={
                    // eslint-disable-next-line no-nested-ternary
                    !firstLoad.semester && !semester
                      ? "Học kỳ không được rỗng"
                      : !isNumber(semester)
                      ? "Học kỳ phải là số"
                      : ""
                  }
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Tên môn học <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  placeholder="Nhập tên môn học"
                  size="small"
                  sx={{ width: "70%" }}
                  value={course}
                  inputProps={{ maxLength: 100 }}
                  onChange={(e) => {
                    dispatch({ type: "SET_COURSE", payload: e.target.value });
                    setFirstLoad({
                      ...firstLoad,
                      course: false
                    });
                  }}
                  error={!firstLoad.course && (!course || !course?.trim())}
                  helperText={
                    // eslint-disable-next-line no-nested-ternary
                    !firstLoad.course && (!course || !course?.trim())
                      ? "Tên môn học không được rỗng"
                      : ""
                  }
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Mã môn học <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  placeholder="Nhập mã môn học"
                  size="small"
                  sx={{ width: "70%" }}
                  value={courseCode}
                  inputProps={{ maxLength: 100 }}
                  onChange={(e) => {
                    dispatch({ type: "SET_COURSE_CODE", payload: e.target.value });
                    setFirstLoad({
                      ...firstLoad,
                      courseCode: false
                    });
                  }}
                  error={!firstLoad.courseCode && (!courseCode || !courseCode.trim())}
                  helperText={
                    // eslint-disable-next-line no-nested-ternary
                    !firstLoad.courseCode && (!courseCode || !courseCode.trim())
                      ? "Mã môn học không được rỗng"
                      : ""
                  }
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
                  Điểm chữ
                </MDTypography>
                <MDInput
                  placeholder="Nhập điểm chữ"
                  size="small"
                  sx={{ width: "70%" }}
                  value={scoreValue}
                  inputProps={{ maxLength: 2 }}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_VALUE",
                      payload: e.target.value ? e.target.value.toUpperCase() : ""
                    });
                    setFirstLoad({
                      ...firstLoad,
                      value: false
                    });
                  }}
                  error={
                    !firstLoad.value &&
                    scoreValue !== "" &&
                    scoreValue &&
                    !AcceptValue.includes(scoreValue?.trim())
                  }
                  helperText={
                    // eslint-disable-next-line no-nested-ternary
                    !firstLoad.value &&
                    scoreValue !== "" &&
                    scoreValue &&
                    !AcceptValue.includes(scoreValue?.trim())
                      ? "Điểm chữ phải là A, B, C, D hoặc A+, B-"
                      : ""
                  }
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
                  error={(!firstLoad.score && score?.length === 0) || +score > 10 || +score < 0}
                  helperText={
                    // eslint-disable-next-line no-nested-ternary
                    !firstLoad.score && score?.length === 0
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

export default AddGradeButton;
