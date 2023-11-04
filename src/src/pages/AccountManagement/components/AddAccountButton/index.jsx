import { useState } from "react";
import { useDispatch } from "react-redux";
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
import { addNew } from "features/accounts/slice";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { isEmailValid } from "utils";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
// import { getEmailDomainsValidSelector } from "features/configuration/selector";
import useMyInfo from "hooks/useMyInfo";
import { roleAccountList } from "utils/constants";
// import UserApi from "api/UserApi";

function AddAccountButton() {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);

  const myInfo = useMyInfo();
  const roleList =
    myInfo.role === "SUPER_ADMIN"
      ? roleAccountList?.map((option) => option.role)
      : roleAccountList
          ?.filter((item) => item.textValue !== "SUPER_ADMIN")
          .map((option) => option.role);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roleList[0]);
  const [firstLoad, setFirstLoad] = useState({
    name: true,
    email: true,
    role: true
  });
  // const emailDomainsValid = useSelector(getEmailDomainsValidSelector);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const resetAllData = () => {
    setName("");
    setEmail("");
    setRole(roleList[0]);
    setFirstLoad({
      name: true,
      email: true,
      role: true
    });
  };

  const isOneReqDataHasValue = () => {
    return name.length > 0 || email.length || (role && role !== roleList[0]);
  };

  const isAllReqDataHasValue = () => {
    return name.length > 0 && email.length && role;
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

  const addAccount = async (req) => {
    setLoading(dispatchContext, true);

    try {
      await dispatch(addNew(req)).unwrap();
      SuccessAlert("Thêm tài khoản thành công");
      setOpen(false);
      resetAllData();
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
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
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFirstLoad({
      ...firstLoad,
      email: false
    });
  };
  const handleRoleChange = (e, newValue) => {
    setRole(newValue);
    setFirstLoad({
      ...firstLoad,
      role: false
    });
  };

  const handleSubmit = () => {
    if ((firstLoad.name && firstLoad.email && firstLoad.role) || !isAllReqDataHasValue()) {
      setFirstLoad({
        name: false,
        email: false,
        role: false
      });
      return;
    }

    // const req = {
    //   name: name.toString().trim(),
    //   emailAddress: email.toString().trim(),
    //   role: roleAccountList.find((item) => item.role === role).textValue
    // };

    // addAccount(req);

    if (isEmailValid(email.toString().trim())) {
      const req = {
        name: name.toString().trim(),
        emailAddress: email.toString().trim(),
        role: roleAccountList.find((item) => item.role === role).textValue
      };

      addAccount(req);
    } else {
      ErrorAlert("Email không hợp lệ!");
    }
  };
  return (
    <>
      <MDButton variant="gradient" color="success" onClick={handleOpen} sx={{ mr: 1 }}>
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
            <Typography textAlign="center" fontSize="25" variant="h5" component="h2">
              Thêm tài khoản mới
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
                  Họ tên <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  placeholder="Nhập họ tên chủ tài khoản"
                  type="text"
                  size="small"
                  sx={{ width: "70%" }}
                  value={name}
                  inputProps={{ maxLength: 100 }}
                  onChange={handleNameChange}
                  error={!firstLoad.name && name.length === 0}
                  helperText={
                    !firstLoad.name && name.length === 0 ? "Họ và tên không được rỗng" : ""
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
                  Email <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  placeholder="Nhập email"
                  type="email"
                  size="small"
                  sx={{ width: "70%" }}
                  value={email}
                  onChange={handleEmailChange}
                  inputProps={{ maxLength: 100 }}
                  error={!firstLoad.email && email.length === 0}
                  helperText={!firstLoad.email && email.length === 0 ? "Email không được rỗng" : ""}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Vai trò <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <Autocomplete
                  noOptionsText="Trống"
                  disablePortal
                  options={roleList}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Chọn vai trò"
                      error={!firstLoad.role && role === null}
                      helperText={
                        !firstLoad.role && role === null ? "Vui lòng chọn ít nhất 1 giá trị" : ""
                      }
                    />
                  )}
                  sx={{ width: "70%" }}
                  value={role}
                  onChange={handleRoleChange}
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

export default AddAccountButton;
