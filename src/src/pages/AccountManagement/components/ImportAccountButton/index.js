import React, { useState } from "react";
import { Backdrop, Box, Modal, Fade, Typography, Icon, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import MDButton from "components/MDComponents/MDButton";
import MDBox from "components/MDComponents/MDBox";
// import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { SuccessAlert, ErrorAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";
import DropFileField from "components/DropFileField";

import { importAccount } from "redux/accounts/slice";
import { getCurrentUserSelector } from "redux/currentUser/selector";
import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { formatDateExcel } from "utils/formatDate";

import importAccountTemplate from "templates/Import_Account.xlsx";
import importAccountAdminTemplate from "templates/Import_Account_Admin.xlsx";

import excel from "assets/images/excel.png";

export default function ImportAccountButton() {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const currentUser = useSelector(getCurrentUserSelector);

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
        await dispatch(importAccount(file)).unwrap();
        SuccessAlert("Import danh sách tài khoản thành công");
        setOpen(false);
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
    const date = formatDateExcel();
    const outputFilename = `MentorUS_Import_danh_sách_tài_khoản_${date}.xlsx`;

    const link = document.createElement("a");
    link.href =
      currentUser.role === "SUPER_ADMIN" ? importAccountAdminTemplate : importAccountTemplate;
    link.setAttribute("download", outputFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /// --------------------------------------------------------

  return (
    <div>
      <MDButton onClick={handleOpen} variant="gradient" color="warning">
        <Icon sx={{ fontWeight: "bold" }}>file_upload</Icon>
        <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
          Import
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
              Tải lên danh sách tài khoản
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
    </div>
  );
}
