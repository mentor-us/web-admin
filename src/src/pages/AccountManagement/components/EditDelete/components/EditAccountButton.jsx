import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Autocomplete,
  Backdrop,
  Box,
  Divider,
  Fade,
  FormControlLabel,
  Icon,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import { editAccountDetail } from "features/accountDetail/slice";
import { editAccount } from "features/accounts/slice";
import PropTypes from "prop-types";

import { setLoading } from "context";
import dayjs from "dayjs";
import { useMentorUs } from "hooks";
import { getValueOfList, isEmailValid } from "utils";

import BasicDatePicker from "components/DatePicker";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";
import useMyInfo from "hooks/useMyInfo";
import { accountStatusList, genderList, roleAccountList } from "utils/constants";
import { getAnotherDateFromToday } from "utils/formatDate";
// import { getEmailDomainsValidSelector } from "features/configuration/selector";

function EditAccountButton({ data, setState, typeButton, isInDetail, isCurrentAccount }) {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);

  const currentAccount = useMyInfo();
  const roleList =
    currentAccount.role === "SUPER_ADMIN"
      ? roleAccountList?.map((option) => option.role)
      : roleAccountList
          ?.filter((item) => item.textValue !== "SUPER_ADMIN")
          .map((option) => option.role);

  const [birthDate, setBirthDate] = useState(dayjs(data.birthDate));
  const [status, setStatus] = useState(data.status);
  const [role, setRole] = useState(getValueOfList(roleAccountList, data.role, "textValue", "role"));
  const [gender, setGender] = useState(data.gender);
  const [personalEmail, setPersonalEmail] = useState(data.personalEmail);
  const [phone, setPhone] = useState(data.phone);
  const [name, setName] = useState(data.name);
  const [firstLoad, setFirstLoad] = useState({
    name: true,
    role: true
  });

  // const emailDomainsValid = useSelector(getEmailDomainsValidSelector);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const GetDataConvert = () => {
    return {
      name,
      birthDate: birthDate ? dayjs(birthDate) : birthDate,
      gender,
      personalEmail,
      phone,
      status,
      role: getValueOfList(roleAccountList, role, "role", "textValue")
    };
  };

  const isOneReqDataHasValue = () => {
    return (
      (personalEmail && personalEmail.length > 0 && personalEmail !== data.personalEmail) ||
      (phone && phone.length > 0 && phone !== data.phone) ||
      (name && name.length > 0 && name !== data.name) ||
      (birthDate !== null && dayjs(birthDate).isSame(dayjs(data.birthDate))) ||
      (role !== null && role !== getValueOfList(roleAccountList, data.role, "textValue", "role"))
    ); // || role.length > 0;
  };

  // const isAllReqDataHasValue = () => {
  //   return status.length > 0 && gender.length > 0; // && role.length > 0;
  // };

  const resetAllReqData = () => {
    setBirthDate(dayjs(data.birthDate));
    setStatus(data.status);
    setGender(data.gender);
    setPersonalEmail(data.personalEmail);
    setPhone(data.phone);
    setName(data.name);
    setRole(getValueOfList(roleAccountList, data.role, "textValue", "role"));
    setFirstLoad({ name: true, role: true });
  };

  const isLostAllData = () => {
    if (isOneReqDataHasValue()) {
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          setOpen(false);
          setState(null);
          resetAllReqData();
        }
      });
    } else {
      setOpen(false);
      resetAllReqData();
    }
  };

  const isFailCase = () => {
    if (personalEmail.length > 0 && !isEmailValid(personalEmail)) {
      ErrorAlert("Email cá nhân không hợp lệ!");
      return true;
    }

    if (birthDate && birthDate.isSameOrAfter(dayjs())) {
      ErrorAlert("Ngày sinh phải nhỏ hơn hiện tại!");
      return true;
    }

    return false;
  };

  const isValidData = () => {
    const isValidBirthDate = birthDate && birthDate.toString() !== "Invalid Date";

    const isValidName = name && name.length > 0;

    const isValidEmail = personalEmail === "" || isEmailValid(personalEmail);

    const isValidPhoneNumber = phone === "" || phone.length === 10;

    return isValidBirthDate && isValidName && isValidEmail && isValidPhoneNumber;
  };

  const EditAccount = async (req) => {
    setLoading(dispatchContext, true);

    try {
      if (!isInDetail) {
        await dispatch(editAccount({ id: data.id, req })).unwrap();
      } else {
        await dispatch(editAccountDetail({ id: data.id, req })).unwrap();
      }
      SuccessAlert("Chỉnh sửa tài khoản thành công");
      setOpen(false);
      setState(null);
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

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handlePersonalEmailChange = (e) => {
    setPersonalEmail(e.target.value?.trim());
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const newValue = value.replace(/[^a-zA-Z0-9]/g, "");
    if (newValue?.length <= 10) {
      setPhone(newValue);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setFirstLoad({ ...firstLoad, name: false });
  };

  const handleStatusChange = (e, newValue) => {
    setStatus(newValue);
  };

  const handleRoleChange = (e, newValue) => {
    setRole(newValue);
    setFirstLoad({
      ...firstLoad,
      role: false
    });
  };

  const handleSubmit = () => {
    // e.preventDefault();
    if (name && name.length > 0 && role && !isFailCase()) {
      const req = GetDataConvert();
      EditAccount(req);
    } else {
      setFirstLoad({ name: false, role: false });
    }
  };

  /// --------------------------------------------------------

  return (
    <>
      {typeButton === "normal" ? (
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
      )}
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
              Chỉnh sửa Tài khoản
            </Typography>
            <MDBox className="relationship__searchBox-item" sx={{ justifyContent: "center" }} m={1}>
              <MDTypography variant="caption" fontWeight="regular" color="dark">
                Cập nhật thông tin cho email <b>{data.email}</b>
              </MDTypography>
            </MDBox>
            <Divider />
            <MDBox mt={3} mb={2}>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Email cá nhân
                </MDTypography>
                <MDInput
                  type="email"
                  placeholder="Nhập email cá nhân"
                  size="small"
                  sx={{ width: "70%" }}
                  value={personalEmail || ""}
                  onChange={handlePersonalEmailChange}
                  inputProps={{ maxLength: 100 }}
                  error={personalEmail && !isEmailValid(personalEmail)}
                  helperText={
                    personalEmail && !isEmailValid(personalEmail) ? "Email không hợp lệ" : ""
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
                  Số điện thoại
                </MDTypography>
                <MDInput
                  placeholder="Nhập số điện thoại"
                  type="number"
                  size="small"
                  sx={{ width: "70%" }}
                  value={phone || ""}
                  onChange={handlePhoneChange}
                  inputProps={{ maxLength: 10 }}
                  pattern="[0-9]{10}"
                />
              </MDBox>

              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Ngày sinh
                </MDTypography>
                <BasicDatePicker
                  value={birthDate}
                  event={setBirthDate}
                  maxDate={getAnotherDateFromToday(dayjs(), 0, "date")}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Họ và tên <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDInput
                  placeholder="Nhập họ tên"
                  type="text"
                  size="small"
                  sx={{ width: "70%" }}
                  value={name}
                  onChange={handleNameChange}
                  inputProps={{ maxLength: 100 }}
                  error={!firstLoad.name && name?.length === 0}
                  helperText={!firstLoad.name && name?.length === 0 ? "Họ tên không được rỗng" : ""}
                />
              </MDBox>
              <MDBox className="relationship__searchBox-item" mb={2}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%" }}
                >
                  Giới tính <span style={{ color: "red" }}>(*)</span>
                </MDTypography>
                <MDBox sx={{ width: "70%" }}>
                  <RadioGroup row value={gender} onChange={handleGenderChange}>
                    {genderList.map((item) => (
                      <FormControlLabel
                        key={item.label}
                        value={item.textValue}
                        control={<Radio />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                </MDBox>
              </MDBox>
              {!isCurrentAccount && (
                <MDBox className="relationship__searchBox-item" mb={2}>
                  <MDTypography
                    variant="body2"
                    fontWeight="regular"
                    color="dark"
                    sx={{ mr: 2, width: "30%" }}
                  >
                    Trạng thái <span style={{ color: "red" }}>(*)</span>
                  </MDTypography>
                  <MDBox sx={{ width: "70%" }}>
                    <RadioGroup row value={status} onChange={handleStatusChange}>
                      {accountStatusList.map((item) => (
                        <FormControlLabel
                          key={item.label}
                          value={item.value}
                          control={<Radio />}
                          label={item.label}
                        />
                      ))}
                    </RadioGroup>
                  </MDBox>
                </MDBox>
              )}
              {currentAccount.id !== data.id && (
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
              )}
            </MDBox>
            <MDBox display="flex" flexDirection="row" justifyContent="center" mt={4}>
              <MDButton
                onClick={handleSubmit}
                variant="contained"
                color="info"
                sx={{ mx: 1 }}
                disabled={!isValidData()}
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
    </>
  );
}

EditAccountButton.defaultProps = {
  typeButton: "normal",
  isInDetail: false,
  isCurrentAccount: false
};

EditAccountButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired,
  typeButton: PropTypes.string,
  isInDetail: PropTypes.bool,
  isCurrentAccount: PropTypes.bool
};

export default EditAccountButton;
