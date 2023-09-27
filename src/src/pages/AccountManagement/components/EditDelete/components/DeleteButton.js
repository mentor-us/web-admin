import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import MDBox from "components/MDComponents/MDBox";
import TooltipCustom from "components/Tooltip";

import { deleteAccount, deleteMultipleAccount } from "redux/accounts/slice";
import { getCurrentUserSelector } from "redux/currentUser/selector";

import { SuccessAlert, ErrorAlert, WarningAlertConfirm } from "components/SweetAlert";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

function DeleteButton({ data, setState, typeButton, redirectURL, isMultiple }) {
  /// --------------------- Khai báo Biến, State -------------

  const navigate = useNavigate();
  const [, dispatchContext] = useMentorUs();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);

  const isDeleteCurrentAccount = () => {
    if (isMultiple) {
      return data.some((item) => item.id === currentUser.id);
    }
    return data.id === currentUser.id;
  };

  const isDeleteAdminRole = () => {
    if (currentUser.role === "ADMIN") {
      if (isMultiple) return data.find((item) => item.role === "ADMIN");
      return data.status === "ADMIN";
    }

    return false;
  };

  const deleteUser = async () => {
    if (isDeleteCurrentAccount()) {
      ErrorAlert("Không được xóa tài khoản đang hoạt động!");
      return;
    }

    if (isDeleteAdminRole()) {
      ErrorAlert("Không được xóa tài khoản có vai trò là quản trị viên!");
      return;
    }

    setLoading(dispatchContext, true);

    try {
      if (!isMultiple) {
        await dispatch(deleteAccount(data.id)).unwrap();
      } else {
        await dispatch(deleteMultipleAccount(data.map((item) => item.id))).unwrap();
      }
      SuccessAlert("Xóa tài khoản thành công");
      setState(null);

      if (redirectURL.length > 0) {
        navigate(redirectURL, { replace: true });
      }
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      } // check lai
    }
    setLoading(dispatchContext, false);
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const handleDeleteUser = async () => {
    const title = "Xóa tài khoản?";
    const html = !isMultiple
      ? `Bạn chắc chắn muốn xóa tài khoản có email <b>${data.email}</b>?`
      : `Bạn chắc chắn muốn xóa các tài khoản <b>được chọn</b>?`;

    WarningAlertConfirm(title, html).then((result) => {
      if (result.isConfirmed) {
        deleteUser();
      }
    });
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  const renderButton = () => {
    if (typeButton === "menu") {
      return (
        <MDBox
          display="flex"
          flexDirection="row"
          alignItems="center"
          onClick={handleDeleteUser}
          sx={{ width: "100%" }}
        >
          <Icon fontSize="medium" sx={{ mr: 1 }} color="error">
            delete
          </Icon>
          <MDTypography variant="subtitle2" fontSize="medium" color="error">
            Xóa
          </MDTypography>
        </MDBox>
      );
    }
    if (typeButton === "normal") {
      return (
        <MDButton variant="gradient" color="error" onClick={handleDeleteUser}>
          <Icon fontSize="medium" sx={{ mr: 1 }}>
            delete
          </Icon>
          <MDTypography variant="body2" fontSize="medium" fontWeight="regular" color="white">
            Xóa
          </MDTypography>
        </MDButton>
      );
    }

    return (
      <TooltipCustom title="Xóa">
        <MDButton variant="outlined" color="error" onClick={handleDeleteUser} iconOnly circular>
          <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
        </MDButton>
      </TooltipCustom>
    );
  };

  return renderButton();
}

DeleteButton.defaultProps = {
  typeButton: "menu",
  redirectURL: "",
  isMultiple: false
};

DeleteButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired,
  typeButton: PropTypes.oneOf(["normal", "modern", "menu"]),
  redirectURL: PropTypes.string,
  isMultiple: PropTypes.bool
};

export default DeleteButton;
