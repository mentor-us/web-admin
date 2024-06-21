import React, { useState } from "react";
import { Backdrop, Box, Divider, Fade, Icon, Modal, Typography } from "@mui/material";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import useSubjectManagementStore from "hooks/client/useSubjectManagementStore";
import { useCreateCourseMutation } from "hooks/courses/mutation";

function AddGradeButton() {
  /// --------------------- Khai báo Biến, State -------------
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const { setState } = useSubjectManagementStore();
  const [firstLoad, setFirstLoad] = useState({
    name: true,
    code: true
  });
  const createCourseMutator = useCreateCourseMutation();

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const resetAllData = () => {
    setName("");
    setCode("");
    setFirstLoad({
      name: true,
      code: true
    });
  };

  // eslint-disable-next-line no-unused-vars
  const addSubject = async (course) => {
    setLoading(dispatchContext, true);

    try {
      // await dispatch(addNewSubject(req)).unwrap();
      await createCourseMutator.mutateAsync(course);
      SuccessAlert("Thêm môn học thành công");
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
    return name.length > 0;
  };

  const isAllReqDataHasValue = () => {
    return name.length > 0;
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

  const handleNameChange = (e) => {
    setName(e.target.value);
    setFirstLoad({
      ...firstLoad,
      name: false
    });
  };
  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setFirstLoad({
      ...firstLoad,
      code: false
    });
  };

  const handleSubmit = async () => {
    if (firstLoad.name || !isAllReqDataHasValue()) {
      setFirstLoad({
        name: false,
        code: false
      });
      return;
    }
    const req = {
      name: name.toString().trim(),
      code: code.toString().trim()
    };
    addSubject(req);
  };
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
              Thêm mới môn học
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
                  Mã môn học <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  placeholder="Nhập mã môn học"
                  type="text"
                  size="small"
                  sx={{ width: "70%" }}
                  value={code}
                  inputProps={{ maxLength: 100 }}
                  onChange={handleCodeChange}
                  error={!firstLoad.code && code.length === 0}
                  helperText={
                    !firstLoad.code && code.length === 0 ? "Mã môn học không được rỗng" : ""
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
                  type="text"
                  size="small"
                  sx={{ width: "70%" }}
                  value={name}
                  inputProps={{ maxLength: 100 }}
                  onChange={handleNameChange}
                  error={!firstLoad.name && name.length === 0}
                  helperText={
                    !firstLoad.name && name.length === 0 ? "Tên môn học không được rỗng" : ""
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
