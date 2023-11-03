import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Backdrop,
  Box,
  Divider,
  Fade,
  FormControlLabel,
  Icon,
  Modal,
  Radio,
  RadioGroup,
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
import TooltipCustom from "components/Tooltip";

import { updateMemberStatisticDetail } from "redux/statisticDetail/slice";

function UpdateStatisticDetail({ data }) {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const [trainingPoint, setTrainingPoint] = useState(data.trainingPoint);
  const [studyingPoint, setStudyingPoint] = useState(data.studyingPoint);
  const [hasEnglishCert, setHasEnglishCert] = useState(data.hasEnglishCert);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const GetDataConvert = () => {
    return {
      trainingPoint: parseFloat(trainingPoint),
      studyingPoint: parseFloat(studyingPoint),
      hasEnglishCert
    };
  };

  const isOneReqDataHasValue = () => {
    return (
      trainingPoint !== data.trainingPoint ||
      studyingPoint !== data.studyingPoint ||
      hasEnglishCert !== data.hasEnglishCert
    );
  };

  // const isAllReqDataHasValue = () => {
  //   return status.length > 0 && gender.length > 0; // && role.length > 0;
  // };

  const resetAllReqData = () => {
    setStudyingPoint(data.studyingPoint);
    setTrainingPoint(data.trainingPoint);
    setHasEnglishCert(data.hasEnglishCert);
  };

  const isLostAllData = () => {
    if (isOneReqDataHasValue()) {
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

  const isFailCase = () => {
    if (studyingPoint.length === 0 || trainingPoint.length === 0) {
      return true;
    }

    if (parseFloat(studyingPoint) < 0 || parseFloat(studyingPoint) > 10) {
      ErrorAlert("Điểm tổng kết không hợp lệ!");
      return true;
    }

    if (parseFloat(trainingPoint) < 0 || parseFloat(trainingPoint) > 100) {
      ErrorAlert("Điểm rèn luyện không hợp lệ!");
      return true;
    }

    return false;
  };

  const EditAccount = async (req) => {
    setLoading(dispatchContext, true);

    try {
      await dispatch(updateMemberStatisticDetail({ id: data.id, req })).unwrap();
      SuccessAlert("Cập nhật hoạt động thành công");
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
  }, [data]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => isLostAllData();

  const handleTrainingPointChange = (e) => {
    const { value } = e.target;

    if (value.toString().length <= 3) {
      setTrainingPoint(value);
    }
  };

  const handleStudyingPointChange = (e) => {
    const { value } = e.target;

    if (value.toString().length <= 5) {
      setStudyingPoint(value);
    }
  };

  const handleHasEnglishCertChange = (e) => {
    setHasEnglishCert(parseInt(e.target.value, 10) === 1);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    if (!isFailCase()) {
      const req = GetDataConvert();
      EditAccount(req);
    }
  };

  /// --------------------------------------------------------

  return (
    <>
      {/* {typeButton === "normal" ? (
        <MDBox display="flex" flexDirection="row" onClick={handleOpen} sx={{ width: "100%" }}>
          <Icon fontSize="medium" sx={{ mr: 1 }} color="info">
            edit
          </Icon>
          <MDTypography variant="subtitle2" fontSize="medium" color="info">
            Sửa
          </MDTypography>
        </MDBox>
      ) : (
        <TooltipCustom title="Chỉnh sửa">
          <MDButton variant="outlined" color="info" iconOnly circular onClick={handleOpen}>
            <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
          </MDButton>
        </TooltipCustom>
      )} */}
      <TooltipCustom title="Cập nhật">
        <MDButton variant="outlined" color="info" iconOnly onClick={handleOpen}>
          <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
        </MDButton>
      </TooltipCustom>
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
              Cập nhật dữ liệu hoạt động
            </Typography>
            <MDBox className="relationship__searchBox-item" sx={{ justifyContent: "center" }} m={1}>
              <MDTypography variant="caption" fontWeight="regular" color="dark">
                Cập nhật dữ liệu cho email <b>{data.email}</b>
              </MDTypography>
            </MDBox>
            <Divider />
            <MDBox mt={3} mb={2}>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%", fontSize: "14px" }}
                >
                  Điểm tổng kết <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  type="number"
                  placeholder="Nhập điểm tổng kết. Ví dụ: 5.5"
                  size="small"
                  sx={{ width: "70%" }}
                  value={studyingPoint}
                  onChange={handleStudyingPointChange}
                  inputProps={{ min: 0, max: 5, step: 0.001 }}
                  error={studyingPoint.length === 0}
                  helperText={studyingPoint.length === 0 ? "Điểm tổng kết không được rỗng" : ""}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%", fontSize: "14px" }}
                >
                  Điểm rèn luyện <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  placeholder="Nhập điểm rèn luyện. Ví dụ: 100"
                  type="number"
                  size="small"
                  sx={{ width: "70%" }}
                  value={trainingPoint}
                  onChange={handleTrainingPointChange}
                  inputProps={{ min: 0, max: 3, step: 0.1 }}
                  error={trainingPoint.length === 0}
                  helperText={trainingPoint.length === 0 ? "Điểm rèn luyện không được rỗng" : ""}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%", fontSize: "14px" }}
                >
                  Bằng tiếng Anh <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDBox sx={{ width: "70%" }}>
                  <RadioGroup
                    row
                    value={hasEnglishCert ? 1 : 0}
                    onChange={handleHasEnglishCertChange}
                  >
                    <FormControlLabel key={1} value={1} control={<Radio />} label="Có" />
                    <FormControlLabel key={0} value={0} control={<Radio />} label="Không" />
                  </RadioGroup>
                </MDBox>
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

// UpdateStatisticDetail.defaultProps = {
//   typeButton: "normal",
//   isInDetail: false
// };

UpdateStatisticDetail.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired
};

export default UpdateStatisticDetail;
