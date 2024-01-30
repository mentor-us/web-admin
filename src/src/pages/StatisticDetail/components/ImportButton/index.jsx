import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Backdrop, Box, Divider, Fade, Icon, Modal, Typography } from "@mui/material";
import {
  importEnglishCertFileDetail,
  importGeneralDetail,
  importStudyingPointFileDetail,
  importTrainingPointFileDetail
} from "features/statisticDetail/slice";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import activity from "assets/images/activity.png";
import certificate from "assets/images/certificate.png";
import excel from "assets/images/excel.png";
import point from "assets/images/point.png";
import update from "assets/images/update-statistic.png";

import DropFileField from "components/DropFileField";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
// import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";

function ImportStatisticPointButton({ templateFileName, template, typeImport, setState }) {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  let importInfo;

  if (typeImport === 1) {
    importInfo = {
      buttonText: "Import danh sách cập nhật chung",
      imageButton: update,
      tooltipTitle: "Cập nhật thông tin cho các cột: Điểm rèn luyện, Bằng Anh Văn, Điểm tổng kết",
      title: "Import danh sách cập nhật chung",
      caption: (
        <>
          Cập nhật thông tin cho các cột: <b>Điểm rèn luyện, Bằng Anh Văn, Điểm tổng kết</b>
        </>
      )
    };
  } else if (typeImport === 2) {
    importInfo = {
      buttonText: "Import cập nhật điểm rèn luyện",
      imageButton: activity,
      tooltipTitle: "Cập nhật thông tin cho cột Điểm rèn luyện",
      title: "Import cập nhật điểm rèn luyện",
      caption: (
        <>
          Cập nhật thông tin cho các cột: <b>Điểm rèn luyện</b>
        </>
      )
    };
  } else if (typeImport === 3) {
    importInfo = {
      buttonText: "Import cập nhật bằng anh văn",
      imageButton: certificate,
      tooltipTitle: "Cập nhật thông tin cho cột Bằng anh văn",
      title: "Import cập nhật bằng anh văn",
      caption: (
        <>
          Cập nhật thông tin cho các cột: <b>Bằng Anh Văn</b>
        </>
      )
    };
  } else if (typeImport === 4) {
    importInfo = {
      buttonText: "Import cập nhật điểm tổng kết",
      imageButton: point,
      tooltipTitle: "Cập nhật thông tin cho cột Điểm tổng kết",
      title: "Import cập nhật điểm tổng kết",
      caption: (
        <>
          Cập nhật thông tin cho các cột: <b>Điểm tổng kết</b>
        </>
      )
    };
  }

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const isLostAllData = () => {
    if (file) {
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          setOpen(false);
          setFile(null);
          setFirstLoad(true);
        }
      });
    } else {
      setOpen(false);
      setFirstLoad(true);
    }
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  const handleOpen = () => setOpen(true);
  const handleClose = () => isLostAllData();

  const handleImport = async () => {
    if (firstLoad && file === null) {
      setFirstLoad(false);
      return;
    }

    if (file !== null) {
      setLoading(dispatchContext, true);

      try {
        if (typeImport === 1) {
          await dispatch(importGeneralDetail(file)).unwrap();
        } else if (typeImport === 2) {
          await dispatch(importTrainingPointFileDetail(file)).unwrap();
        } else if (typeImport === 3) {
          await dispatch(importEnglishCertFileDetail(file)).unwrap();
        } else if (typeImport === 4) {
          await dispatch(importStudyingPointFileDetail(file)).unwrap();
        }
        SuccessAlert("Import danh sách thành công");
        setOpen(false);
        setFile(null);
        setState(false);
      } catch (error) {
        if (error?.message !== "401") {
          ErrorAlert(error?.message);
        }
      }

      setLoading(dispatchContext, false);
    }
  };

  const handleDownloadTemplate = async () => {
    const outputFilename = templateFileName;

    setLoading(dispatchContext, true);
    const link = document.createElement("a");
    link.href = template;
    link.setAttribute("download", outputFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setLoading(dispatchContext, false);
  };

  /// --------------------------------------------------------

  return (
    <>
      <TooltipCustom title={importInfo.tooltipTitle}>
        <MDButton
          onClick={handleOpen}
          variant="outlined"
          color="white"
          sx={{
            border: "2px solid #E9E8E8!important",
            boxShadow: "none!important",
            padding: "7px 15px!important",
            width: "70%",
            my: 1
          }}
        >
          <img
            src={importInfo.imageButton}
            alt=""
            style={{ objectFit: "contain", width: "30px", marginRight: "5px" }}
          />
          <MDTypography
            variant="body2"
            fontWeight="regular"
            color="text"
            sx={{ pl: 1.5, textAlign: "left" }}
          >
            {importInfo.buttonText}
          </MDTypography>
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
          <Box className="group-modal__container" sx={{ width: "600px" }}>
            <Typography
              id="transition-modal-title"
              textAlign="center"
              fontSize="25px"
              variant="h5"
              component="h2"
            >
              {importInfo.title}
            </Typography>
            <MDBox className="relationship__searchBox-item" sx={{ justifyContent: "center" }} m={1}>
              <MDTypography variant="caption" fontWeight="regular" color="dark">
                {importInfo.caption}
              </MDTypography>
            </MDBox>
            <Divider />
            <MDBox mt={3} mb={2} display="flex" flexDirection="column" alignItems="center">
              <DropFileField setState={setFile} />
              {!firstLoad && file === null && (
                <MDTypography fontSize="16px" color="error" sx={{ mt: 2 }}>
                  Vui lòng kéo thả hoặc chọn tập tin
                </MDTypography>
              )}
              <MDBox sx={{ mt: 2 }}>
                <TooltipCustom title="Nhấn vào đây để tải xuống tập tin mẫu">
                  <MDButton
                    onClick={handleDownloadTemplate}
                    variant="outlined"
                    color="white"
                    sx={{
                      border: "2px solid #E9E8E8!important",
                      boxShadow: "none!important",
                      padding: "7px 15px!important"
                    }}
                  >
                    <img
                      src={excel}
                      alt=""
                      style={{ objectFit: "contain", width: "30px", marginRight: "5px" }}
                    />
                    <MDTypography
                      fontSize="16px"
                      color="light"
                      style={{
                        cursor: "pointer",
                        color: "black",
                        width: "fit-content",
                        textTransform: "none!important"
                      }}
                    >
                      Tải tập tin mẫu
                    </MDTypography>
                  </MDButton>
                </TooltipCustom>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="row" justifyContent="center" mt={4}>
              <MDButton onClick={handleImport} variant="contained" color="info" sx={{ mx: 1 }}>
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

ImportStatisticPointButton.propTypes = {
  templateFileName: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
  typeImport: PropTypes.oneOf([1, 2, 3, 4]).isRequired,
  setState: PropTypes.func.isRequired
};

export default ImportStatisticPointButton;
