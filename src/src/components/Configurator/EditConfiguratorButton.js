import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Backdrop, Box, Modal, Fade, Typography, Icon, Divider } from "@mui/material";
import { useDispatch } from "react-redux";

import MDButton from "components/MDComponents/MDButton";
import MDBox from "components/MDComponents/MDBox";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
// import TooltipCustom from "components/Tooltip";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import { setLoading } from "context";
import { updateFromToRangeConfiguration } from "redux/configuration/slice";
import { useMentorUs } from "hooks";

import "./styles.css";

function EditConfiguratorButton({ data }) {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const [fromToRange, setFromToRange] = useState(data.fromToRange.value);
  // const [emailDomainsValid, setEmailDomainsValid] = useState(data.emailDomainsValid.value);
  // const [newEmailDomain, setNewEmailDomain] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const [isError, setIsError] = useState(false);
  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  // const compareArrays = (a, b) =>
  //   a.length === b.length && a.every((element, index) => element === b[index]);

  const isValueChange = () => {
    return (
      fromToRange > 0 && fromToRange !== data.fromToRange.value
      // ||
      // (emailDomainsValid.length > 0 &&
      //   !compareArrays(emailDomainsValid, data.emailDomainsValid.value))
    );
  };

  const isAllReqDataHasValue = () => {
    return fromToRange > 0;
  };

  const isFailCase = () => {
    // if (emailDomainsValid.length === 0) {
    //   setErrorMessage("Vui lòng nhập ít nhất 1 domain email");
    //   return true;
    // }

    if (fromToRange <= 0 || fromToRange >= 100) {
      ErrorAlert("Khoảng thời gian tối đa phải lớn hơn 0 hoặc nhỏ hơn 100 năm!");
      return true;
    }

    return false;
  };

  const resetAllReqData = () => {
    setFromToRange(data.fromToRange.value);
    // setEmailDomainsValid(data.emailDomainsValid.value);
    // setNewEmailDomain("");
    // setErrorMessage("");
    // setIsError(false);
  };

  const isLostAllData = () => {
    if (isValueChange()) {
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          setOpen(false);
          resetAllReqData();
        }
      });
    } else {
      setOpen(false);
      resetAllReqData();
    }
  };

  const EditConfiguration = async () => {
    setLoading(dispatchContext, true);

    try {
      // if (!compareArrays(emailDomainsValid, data.emailDomainsValid.value)) {
      //   await dispatch(
      //     updateDomainConfiguration({
      //       id: data.emailDomainsValid.id,
      //       req: emailDomainsValid
      //     })
      //   ).unwrap();
      // }

      if (fromToRange !== data.fromToRange.value) {
        await dispatch(
          updateFromToRangeConfiguration({
            id: data.fromToRange.id,
            req: fromToRange
          })
        ).unwrap();
      }

      SuccessAlert("Chỉnh sửa cấu hình thành công");
      // setNewEmailDomain("");
      setOpen(false);
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    resetAllReqData();
  }, [data.fromToRange, data.emailDomainsValid]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => isLostAllData();

  const handleFromToRangeChange = (e) => {
    const { value } = e.target;

    if (value.length <= 2) {
      setFromToRange(value);
    }
  };

  // const handleDeleteDomainChange = (index) => {
  //   if (emailDomainsValid.length >= 1) {
  //     const newVal = emailDomainsValid.filter((item, i) => i !== index);
  //     if (newVal.length === 0) {
  //       setErrorMessage("Vui lòng nhập ít nhất 1 domain email");
  //     }

  //     setEmailDomainsValid(newVal);
  //   } else {
  //     setErrorMessage("Không còn domain hợp lệ để xóa");
  //   }
  // };

  // const handleAddEmailDomain = () => {
  //   if (newEmailDomain.length === 0) {
  //     setIsError(true);
  //   } else {
  //     setIsError(false);
  //     if (emailDomainsValid.includes(newEmailDomain)) {
  //       ErrorAlert(`Đã tồn tại domain email: ${newEmailDomain} trong danh sách!`);
  //     } else {
  //       setEmailDomainsValid((oldVal) => {
  //         const newVal = [...oldVal];
  //         newVal.push(newEmailDomain);
  //         return newVal;
  //       });
  //       setNewEmailDomain("");
  //       setErrorMessage("");
  //     }
  //   }
  // };

  // const handleNewEmailDomainChange = (e) => {
  //   const { value } = e.target;
  //   setNewEmailDomain(value);

  //   if (value.length > 0) {
  //     setIsError(false);
  //   }
  // };

  const handleSubmit = () => {
    // e.preventDefault();
    if (!isFailCase() && isAllReqDataHasValue()) {
      EditConfiguration();
    }
  };

  /// --------------------------------------------------------

  return (
    <>
      <MDButton variant="contained" color="info" onClick={handleOpen} sx={{ mt: 1 }}>
        <Icon fontSize="medium" sx={{ mr: 1 }}>
          edit
        </Icon>
        <MDTypography variant="body2" fontWeight="regular" color="white">
          Cập nhật
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
              Cập nhật thông tin cấu hình
            </Typography>
            <Divider />
            <MDBox mt={3} mb={2}>
              {/* <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "40%", fontSize: "14px" }}
                >
                  Các domain hợp lệ <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDBox sx={{ width: "70%" }}>
                  {emailDomainsValid.length > 0 &&
                    emailDomainsValid.map((item, index) => (
                      <MDBox key={item} className="configuration__email-item">
                        <MDInput
                          placeholder="Nhập phần đuôi email"
                          size="small"
                          sx={{ width: "80%" }}
                          readOnly
                          disabled
                          value={item || ""}
                        />
                        <IconButton size="medium" onClick={() => handleDeleteDomainChange(index)}>
                          <Icon fontSize="inherit">close</Icon>
                        </IconButton>
                      </MDBox>
                    ))}
                  <MDBox className="configuration__email-item">
                    <MDInput
                      placeholder="Nhập domain email mới"
                      size="small"
                      sx={{ width: "80%" }}
                      value={newEmailDomain}
                      onChange={handleNewEmailDomainChange}
                      error={isError}
                      helperText={isError ? "Vui lòng nhập domain email cần thêm mới!" : ""}
                    />
                    <TooltipCustom title="Thêm mới một domain email">
                      <IconButton size="medium" onClick={handleAddEmailDomain}>
                        <Icon fontSize="inherit">add</Icon>
                      </IconButton>
                    </TooltipCustom>
                  </MDBox>
                  {errorMessage.length > 0 && (
                    <MDTypography
                      variant="subtitle2"
                      fontWeight="regular"
                      color="error"
                      sx={{
                        mt: 0.5,
                        fontSize: "0.8rem",
                        fontWeight: "300",
                        letterSpacing: "0.0333rem"
                      }}
                    >
                      {errorMessage}
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
              <Divider /> */}
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDBox
                  sx={{ width: "40%" }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  mr={2}
                >
                  <MDTypography
                    variant="body2"
                    fontWeight="regular"
                    color="dark"
                    sx={{ fontSize: "14px" }}
                  >
                    Khoảng thời gian tối đa <span style={{ color: "red" }}>(*)</span>
                  </MDTypography>
                  <MDTypography variant="caption" color="dark">
                    Đơn vị: <b>năm</b>
                  </MDTypography>
                </MDBox>
                <MDInput
                  type="number"
                  placeholder="Nhập thời gian"
                  size="small"
                  sx={{ width: "70%" }}
                  value={fromToRange || " "}
                  onChange={handleFromToRangeChange}
                  inputProps={{ maxLength: 2 }}
                  error={fromToRange && fromToRange.length === 0}
                  helperText={
                    fromToRange && fromToRange.length === 0
                      ? "Khoảng thời gian không được rỗng"
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

EditConfiguratorButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired
};

export default EditConfiguratorButton;
