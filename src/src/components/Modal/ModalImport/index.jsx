import React, { useState } from "react";
import { Backdrop, Box, Divider, Fade, Icon, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import excel from "assets/images/excel.png";

import DropFileField from "components/DropFileField";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";

function ModalImport({
  open = false,
  closeModal,
  title = "null",
  templateFile = null,
  templateFileName = "",
  importAction = null
}) {
  const [, dispatchContext] = useMentorUs();
  const [firstLoad, setFirstLoad] = useState(true);
  const [file, setFile] = useState(null);

  const isLostAllData = () => {
    if (file) {
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          closeModal();
          setFile(null);
          setFirstLoad(true);
        }
      });
    } else {
      closeModal();
      setFirstLoad(true);
    }
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  const handleClose = () => isLostAllData();

  // const handleChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  const handleImport = async () => {
    if (firstLoad && file === null) {
      setFirstLoad(false);
      return;
    }

    if (file !== null) {
      setLoading(dispatchContext, true);

      try {
        if (importAction) {
          await importAction(file);
        }
        // await dispatch(importAccount(file)).unwrap();
        SuccessAlert("Import danh sách tài khoản thành công");
        closeModal();
        setFile(null);
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

    const link = document.createElement("a");
    link.href = templateFile;
    link.setAttribute("download", outputFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
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
            {title}
          </Typography>
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
  );
}

ModalImport.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  templateFile: PropTypes.any.isRequired,
  templateFileName: PropTypes.string.isRequired,
  importAction: PropTypes.func.isRequired
};

export default ModalImport;
