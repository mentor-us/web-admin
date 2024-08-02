/* eslint-disable react/prop-types */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import excel from "assets/images/excel.png";

import DropFileField from "components/DropFileField";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";
import AutoCompleteEmailInput from "components/AutoComplete/AutoCompleteEmailInput";
import { useSelector } from "react-redux";
import { getAccountsTableSelector } from "features/accounts/selector";
import { useGetAllUsers } from "hooks/users/queries";

function ModalImport({
  open = false,
  closeModal,
  title = "null",
  templateFile = null,
  templateFileName = "",
  importAction = null,
  isSelectUser = false,
  onUserSelectedChange = (userId) => {},
  userSelectPlaceholder = "Chọn sinh viên",
  userSelectHelperText = "Vui lòng chọn sinh viên"
}) {
  const { data: users } = useGetAllUsers({
    query: "user"
  });
  const [, dispatchContext] = useMentorUs();
  const [firstLoad, setFirstLoad] = useState(true);
  const [file, setFile] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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
      setSelectedUser(null);
      setFile(null);
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
        SuccessAlert("Import thành công");
        closeModal();
        setFile(null);
        setFirstLoad(true);
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
          {isSelectUser && (
            <MDBox className="relationship__searchBox-item" mb={2}>
              <MDTypography
                variant="body2"
                fontWeight="regular"
                color="dark"
                sx={{ mr: 2, width: "30%" }}
              >
                Chọn sinh viên
                <span style={{ color: "red" }}>(*)</span>
              </MDTypography>
              <Autocomplete
                noOptionsText="Không có thông tin sinh viên"
                value={selectedUser}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(e, newValue) => {
                  setSelectedUser(newValue);
                  onUserSelectedChange(newValue?.id);
                }}
                sx={{
                  width: "70%",
                  pl: "0!important",
                  pt: "0!important"
                }}
                color="text"
                options={users ?? []}
                getOptionLabel={(option) => option?.email || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={userSelectPlaceholder}
                    size="small"
                    error={!firstLoad && selectedUser === null}
                    helperText={!firstLoad && selectedUser === null ? userSelectHelperText : ""}
                  />
                )}
              />
            </MDBox>
          )}
          <MDBox mt={3} mb={2} display="flex" flexDirection="column" alignItems="center">
            <DropFileField setState={setFile} />
            {!firstLoad && file === null && (
              <MDTypography fontSize="16px" color="error" sx={{ mt: 2 }}>
                Vui lòng kéo thả hoặc chọn tập tin
              </MDTypography>
            )}
            {templateFile && (
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
            )}
          </MDBox>
          <MDBox display="flex" flexDirection="row" justifyContent="center" mt={4}>
            <MDButton
              onClick={handleImport}
              variant="contained"
              color="info"
              sx={{ mx: 1 }}
              disabled={isSelectUser && selectedUser === null}
            >
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

ModalImport.defaultProps = {
  isSelectUser: false,
  onUserSelectedChange: (userId) => {},
  userSelectPlaceholder: "Chọn sinh viên",
  userSelectHelperText: "Vui lòng chọn sinh viên"
};

ModalImport.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  templateFile: PropTypes.any.isRequired,
  templateFileName: PropTypes.string.isRequired,
  importAction: PropTypes.func.isRequired,
  isSelectUser: PropTypes.bool,
  onUserSelectedChange: PropTypes.func,
  userSelectPlaceholder: PropTypes.string,
  userSelectHelperText: PropTypes.string
};

export default ModalImport;
