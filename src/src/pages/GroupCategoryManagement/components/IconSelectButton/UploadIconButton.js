import React, { useState } from "react";
import { Backdrop, Box, Divider, Fade, Icon, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";

import DropFileField from "components/DropFileField";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { WarningAlertConfirmNotSavingData } from "components/SweetAlert";

function UploadIconButton({ setState, setAnotherState }) {
  /// --------------------- Khai báo Biến, State -------------

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);

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

  const handleImport = () => {
    if (firstLoad && file === null) {
      setFirstLoad(false);
      return;
    }

    if (file !== null) {
      // xử lý trả url
      setState(file);
      setAnotherState(false);
      setOpen(false);
    }
  };

  /// --------------------------------------------------------

  return (
    <>
      <MDButton onClick={handleOpen} variant="gradient" color="warning">
        <Icon sx={{ fontWeight: "bold" }}>cloud_upload</Icon>
        <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
          Biểu tượng mới
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
          <Box className="group-modal__container" sx={{ width: "600px" }}>
            <Typography
              id="transition-modal-title"
              textAlign="center"
              fontSize="25px"
              variant="h5"
              component="h2"
            >
              Tải lên biểu tượng mới
            </Typography>
            <Divider />
            <MDBox mt={3} mb={2} display="flex" flexDirection="column" alignItems="center">
              <DropFileField setState={setFile} accept=".png, .jpeg, .jpg" />
              {!firstLoad && file === null && (
                <MDTypography fontSize="16px" color="error" sx={{ mt: 2 }}>
                  Vui lòng kéo thả hoặc chọn tập tin
                </MDTypography>
              )}
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

UploadIconButton.defaultProps = {
  setAnotherState: () => {}
};

UploadIconButton.propTypes = {
  setState: PropTypes.func.isRequired,
  setAnotherState: PropTypes.func
};

export default UploadIconButton;
