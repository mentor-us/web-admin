import { useDispatch } from "react-redux";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
// import { getMyInfoSelector } from "redux/currentUser/selector";
import { ErrorAlert, SuccessAlert, WarningAlertConfirm } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";

import { disableGroupDetail } from "redux/groupDetail/slice";
import { disableGroup } from "redux/groups/slice";

function DisableGroupButton({ data, setState, typeButton, isInDetail, isMultiple }) {
  /// --------------------- Khai báo Biến, State -------------

  const [, dispatchContext] = useMentorUs();
  const dispatch = useDispatch();

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  //   const isDisableCurrentGroup = () => {
  //     if (isMultiple) {
  //       return data.some((item) => item.id === currentUser.id);
  //     }
  //     return data.id === currentUser.id;
  //   };

  const changeStatus = async () => {
    // if (isDisableCurrentGroup()) {
    //   ErrorAlert("Không được khóa nhóm hiện tại!");
    //   return;
    // }

    setLoading(dispatchContext, true);

    try {
      if (isMultiple) {
        await dispatch(
          disableGroup(data.filter((item) => item.status !== "DELETED").map((item) => item.id))
        ).unwrap();
      } else if (isInDetail) {
        await dispatch(disableGroupDetail([data.id])).unwrap();
      } else {
        await dispatch(disableGroup([data.id])).unwrap();
      }
      SuccessAlert("Khóa nhóm thành công");

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

  const handleStatusGroupChange = async () => {
    const title = "Khóa nhóm?";
    const html = !isMultiple
      ? `Bạn chắc chắn muốn khóa nhóm có tên <b>${data.name}</b>?`
      : `Bạn chắc chắn muốn khóa các nhóm được chọn?`;

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
          onClick={handleStatusGroupChange}
        >
          <Icon fontSize="medium" sx={{ mr: 1 }} color="warning">
            lock_person
          </Icon>
          <MDTypography variant="subtitle2" fontSize="medium" color="warning">
            Khóa nhóm
          </MDTypography>
        </MDBox>
      );
    }

    if (typeButton === "normal") {
      return (
        <MDButton variant="gradient" color="warning" onClick={handleStatusGroupChange}>
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
      <TooltipCustom title="Khóa nhóm">
        <MDButton
          variant="outlined"
          color="warning"
          onClick={handleStatusGroupChange}
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

DisableGroupButton.defaultProps = {
  typeButton: "menu",
  isInDetail: false,
  isMultiple: false
};
DisableGroupButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired,
  typeButton: PropTypes.oneOf(["normal", "modern", "menu"]),
  isInDetail: PropTypes.bool,
  isMultiple: PropTypes.bool
};

export default DisableGroupButton;
