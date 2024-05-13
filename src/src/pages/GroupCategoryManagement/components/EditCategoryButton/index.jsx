import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, Box, Divider, Fade, Icon, Modal, Typography } from "@mui/material";
import { getCategoryPermissionsSelector } from "features/groupsCategory/selector";
import { editCategory } from "features/groupsCategory/slice";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { getImageUrlWithKey } from "utils";

import AutoCompleteCheckbox from "components/AutoComplete/AutoCompleteCheckbox";
import MDAvatar from "components/MDComponents/MDAvatar";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";

import IconSelectButton from "../IconSelectButton";

function EditCategoryButton({ data, setState }) {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);
  const currentPermissions = useSelector(getCategoryPermissionsSelector);
  const defaultValue = {
    name: data.name,
    description: data.description,
    iconURL: getImageUrlWithKey(data.iconUrl),
    permissions: currentPermissions.filter((item) => data.permissions.includes(item.name))
  };
  const [name, setName] = useState(defaultValue.name);
  const [description, setDescription] = useState(defaultValue.description);
  const [iconURL, setIconURL] = useState(getImageUrlWithKey(data.iconUrl));
  const [permission, setPermission] = useState(defaultValue.permissions);
  const [firstLoad, setFirstLoad] = useState({
    name: true
  });

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const resetAllData = () => {
    setName(data.name);
    setDescription(data.description);
    setIconURL(getImageUrlWithKey(data.iconUrl));
    setPermission(currentPermissions.filter((item) => data.permissions.includes(item.name)));
    setFirstLoad({
      name: true
    });
  };

  const updateCategory = async (req) => {
    setLoading(dispatchContext, true);

    try {
      await dispatch(editCategory({ id: data.id, req })).unwrap();
      SuccessAlert("Chỉnh sửa loại nhóm thành công");
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
    return name !== defaultValue.name || iconURL !== defaultValue.iconURL;
  };

  // const isReqDataEqualToDefault = () => {
  //   return iconEditable
  //     ? name === defaultValue.name &&
  //         iconURL === defaultValue.iconURL &&
  //         description === defaultValue.description &&
  //         permission === defaultValue.permissions
  //     : name === defaultValue.name &&
  //         description === defaultValue.description &&
  //         permission === defaultValue.permissions;
  // };

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
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
      description: description.toString().trim(),
      iconUrl: iconURL,
      permissions: permission.map((item) => item.name)
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
              Chỉnh sửa loại nhóm
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
                  type="text"
                  size="small"
                  sx={{ width: "70%" }}
                  inputProps={{ maxLength: 100 }}
                  value={name}
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
                {currentPermissions.length > 0 && (
                  <AutoCompleteCheckbox
                    placeholder="Chọn các quyền ứng dụng"
                    options={currentPermissions}
                    sx={{ width: "70%" }}
                    value={permission}
                    onChange={setPermission}
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

EditCategoryButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired
};

export default EditCategoryButton;
