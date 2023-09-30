import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirm } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";

import { deleteGroup, deleteMultipleGroups } from "redux/groups/slice";

function DeleteGroupButton({ data, setState, typeButton, redirectURL, isMultiple }) {
  /// --------------------- Khai báo Biến, State -------------

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const deleteGroupID = async () => {
    setLoading(dispatchContext, true);

    try {
      if (!isMultiple) {
        await dispatch(deleteGroup(data.id)).unwrap();
      } else {
        await dispatch(deleteMultipleGroups(data.map((item) => item.id))).unwrap();
      }
      SuccessAlert("Xóa nhóm thành công");
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
  /// --------------------- Các hàm event ---------------------

  const handleDeleteGroup = async () => {
    if (data.status === "DELETED" && !isMultiple) {
      ErrorAlert("Nhóm đã được xóa!");
      return;
    }

    const title = "Xóa Nhóm?";
    const html = !isMultiple
      ? `Bạn chắc chắn muốn xóa nhóm <b>${data.name}</b>?`
      : `Bạn chắc chắn muốn xóa các nhóm được chọn?`;

    WarningAlertConfirm(title, html).then((result) => {
      if (result.isConfirmed) {
        deleteGroupID();
      }
    });
  };

  const renderButton = () => {
    if (typeButton === "menu") {
      return (
        <MDBox
          display="flex"
          flexDirection="row"
          onClick={handleDeleteGroup}
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
        <MDButton variant="gradient" color="error" onClick={handleDeleteGroup}>
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
        <MDButton variant="outlined" color="error" onClick={handleDeleteGroup} iconOnly circular>
          <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
        </MDButton>
      </TooltipCustom>
    );
  };

  /// --------------------------------------------------------

  return renderButton();
}

DeleteGroupButton.defaultProps = {
  typeButton: "menu",
  redirectURL: "",
  isMultiple: false
};

DeleteGroupButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired,
  typeButton: PropTypes.oneOf(["normal", "modern", "menu"]),
  redirectURL: PropTypes.string,
  isMultiple: PropTypes.bool
};

export default DeleteGroupButton;
