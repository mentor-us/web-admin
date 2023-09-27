import React, { useState } from "react";
import { Backdrop, Box, Modal, Fade, Typography, Icon, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import MDButton from "components/MDComponents/MDButton";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import MDInput from "components/MDComponents/MDInput";
import MDAvatar from "components/MDComponents/MDAvatar";
import AutoCompleteCheckbox from "components/AutoComplete/AutoCompleteCheckbox";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { SuccessAlert, ErrorAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import { addNewCategory } from "redux/groupsCategory/slice";
import { getCategoryPermissionsSelector } from "redux/groupsCategory/selector";

import { imageIconList } from "utils/constants";
import IconSelectButton from "../IconSelectButton";

function AddCategoryButton() {
  /// --------------------- Khai báo Biến, State -------------
  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconURL, setIconURL] = useState(imageIconList[0].src);
  const [permission, setPermission] = useState([]);
  const [firstLoad, setFirstLoad] = useState({
    name: true
  });
  const permissions = useSelector(getCategoryPermissionsSelector);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const resetAllData = () => {
    setName("");
    setDescription("");
    setIconURL(imageIconList[0].src);
    setPermission([]);
    setFirstLoad({
      name: true
    });
  };

  const addCategory = async (req) => {
    setLoading(dispatchContext, true);

    try {
      await dispatch(addNewCategory(req)).unwrap();
      SuccessAlert("Thêm loại nhóm thành công");
      setOpen(false);
      resetAllData();
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
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // const handleIconChange = (event) => {
  //   setIcon(event.target.files[0]);

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setIconURL(reader.result);
  //   };
  //   reader.readAsDataURL(event.target.files[0]);

  //   setFirstLoad({
  //     ...firstLoad,
  //     icon: false
  //   });
  // };

  const handleSubmit = async () => {
    if (firstLoad.name || !isAllReqDataHasValue()) {
      setFirstLoad({
        name: false
      });
      return;
    }
    const req = {
      name: name.toString().trim(),
      description: description.toString().trim(),
      iconUrl: iconURL,
      permissions: permission.map((item) => item.name)
    };
    addCategory(req);
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
              Thêm mới loại nhóm
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
                  Tên loại nhóm <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  placeholder="Nhập tên loại nhóm"
                  type="text"
                  size="small"
                  sx={{ width: "70%" }}
                  value={name}
                  inputProps={{ maxLength: 100 }}
                  onChange={handleNameChange}
                  error={!firstLoad.name && name.length === 0}
                  helperText={
                    !firstLoad.name && name.length === 0 ? "Tên loại nhóm không được rỗng" : ""
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
                  Mô tả
                </MDTypography>
                <MDInput
                  placeholder="Nhập mô tả cho loại nhóm"
                  multiline
                  type="text"
                  size="small"
                  sx={{ width: "70%" }}
                  inputProps={{ maxLength: 200 }}
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Biểu tượng <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDAvatar
                  src={iconURL}
                  alt="category-image"
                  shadow="sm"
                  size="lg"
                  sx={{
                    alignSelf: "center",
                    mr: 1
                  }}
                />
                <IconSelectButton setState={setIconURL} />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Quyền ứng dụng
                </MDTypography>
                {permissions.length > 0 && (
                  <AutoCompleteCheckbox
                    label="Chọn các quyền ứng dụng"
                    data={permissions}
                    styleCSS={{ width: "70%" }}
                    value={permission}
                    event={setPermission}
                  />
                )}
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

export default AddCategoryButton;
