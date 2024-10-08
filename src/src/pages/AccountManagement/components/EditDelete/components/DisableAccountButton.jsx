import React from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@mui/material";
import { disableAccountDetail } from "features/accountDetail/slice";
import { disableAccount } from "features/accounts/slice";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirm } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";
import useMyInfo from "hooks/useMyInfo";

function DisableAccountButton({ data, setState, typeButton, isInDetail, isMultiple }) {
  /// --------------------- Khai báo Biến, State -------------

  const [, dispatchContext] = useMentorUs();
  const dispatch = useDispatch();

  const myInfo = useMyInfo();

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const isDisableCurrentAccount = () => {
    if (isMultiple) {
      return data.some((item) => item.id === myInfo.id);
    }
    return data.id === myInfo.id;
  };

  const changeStatus = async () => {
    if (isDisableCurrentAccount()) {
      ErrorAlert("Không được khóa tài khoản hiện tại!");
      return;
    }

    setLoading(dispatchContext, true);

    try {
      if (isMultiple) {
        await dispatch(disableAccount(data.map((item) => item.id))).unwrap();
      } else if (isInDetail) {
        await dispatch(disableAccountDetail([data.id])).unwrap();
      } else {
        await dispatch(disableAccount([data.id])).unwrap();
      }
      SuccessAlert("Khóa tài khoản thành công");

      setState(null);
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      } // check lai
    }
    setLoading(dispatchContext, false);
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  const handleStatusUserChange = async () => {
    const title = "Khóa tài khoản?";
    const html = !isMultiple
      ? `Bạn chắc chắn muốn khóa tài khoản có email <b>${data.email}</b>?`
      : `Bạn chắc chắn muốn khóa các tài khoản được chọn?`;

    WarningAlertConfirm(title, html).then((result) => {
      if (result.isConfirmed) {
        changeStatus();
      }
    });
  };

  const renderButton = () => {
    if (typeButton === "menu") {
      return (
        <MDBox
          display="flex"
          flexDirection="row"
          alignItems="center"
          onClick={handleStatusUserChange}
        >
          <Icon fontSize="medium" sx={{ mr: 1 }} color="warning">
            lock_person
          </Icon>
          <MDTypography variant="subtitle2" fontSize="medium" color="warning">
            Khóa tài khoản
          </MDTypography>
        </MDBox>
      );
    }

    if (typeButton === "normal") {
      return (
        <MDButton variant="gradient" color="error" onClick={handleStatusUserChange}>
          <Icon fontSize="medium" sx={{ mr: 1 }}>
            lock_person
          </Icon>
          <MDTypography variant="body2" fontSize="medium" fontWeight="regular" color="white">
            Khóa
          </MDTypography>
        </MDButton>
      );
    }

    return (
      <TooltipCustom title="Khóa tài khoản">
        <MDButton
          variant="outlined"
          color="warning"
          onClick={handleStatusUserChange}
          iconOnly
          circular
        >
          <Icon sx={{ fontWeight: "bold" }}>lock_person</Icon>
        </MDButton>
      </TooltipCustom>
    );
  };

  return renderButton();
}

DisableAccountButton.defaultProps = {
  typeButton: "menu",
  isInDetail: false,
  isMultiple: false
};

DisableAccountButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired,
  typeButton: PropTypes.oneOf(["normal", "modern", "menu"]),
  isInDetail: PropTypes.bool,
  isMultiple: PropTypes.bool
};

export default DisableAccountButton;
