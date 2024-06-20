import React, { useState } from "react";
import { Backdrop, Box, Divider, Fade, Icon, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import { useUpdateCourseMutation } from "hooks/courses/mutation";

function EditSubjectButton({ data, setState }) {
  /// --------------------- Khai báo Biến, State -------------

  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const defaultValue = {
    name: data.name,
    code: data.code
  };
  const [name, setName] = useState(defaultValue.name);
  const [code, setCode] = useState(defaultValue.code);
  const [firstLoad, setFirstLoad] = useState({
    name: true,
    code: true
  });
  const updateCourseMutator = useUpdateCourseMutation();

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const resetAllData = () => {
    setName(data.name);
    setCode(data.code);
    setFirstLoad({
      name: true
    });
  };

  const updateCategory = async (req) => {
    setLoading(dispatchContext, true);

    try {
      await updateCourseMutator.mutateAsync({ id: data.id, ...req });
      SuccessAlert("Chỉnh sửa môn học thành công");
      setState(null);
      setOpen(false);
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

  const isRequireDataDifferentFromDefault = () => {
    return name !== defaultValue.name;
  };

  const isLostAllData = () => {
    if (isOneReqDataHasValue() && isRequireDataDifferentFromDefault()) {
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

  const handleSubmit = () => {
    if (firstLoad.name && name.length === 0) {
      setFirstLoad({
        name: false
      });
      return;
    }

    const req = {
      name: name.toString().trim(),
      code: code.toString().trim()
    };
    updateCategory(req);
  };

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
                  Mã môn học <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  placeholder="Nhập mã môn học"
                  type="text"
                  size="small"
                  sx={{ width: "70%" }}
                  inputProps={{ maxLength: 100 }}
                  value={code}
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
                  inputProps={{ maxLength: 100 }}
                  value={name}
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

EditSubjectButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired
};

export default EditSubjectButton;
