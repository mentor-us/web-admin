import React from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@mui/material";
import { enableGroupDetail } from "features/groupDetail/slice";
import { enableGroup } from "features/groups/slice";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";

function EnableGroupButton({ data, setState, typeButton, isInDetail, isMultiple }) {
  /// --------------------- Khai báo Biến, State -------------
  const [, dispatchContext] = useMentorUs();
  const dispatch = useDispatch();

  const changeStatus = async () => {
    setLoading(dispatchContext, true);

    try {
      if (isMultiple) {
        await dispatch(
          enableGroup(data.filter((item) => item.status !== "DELETED").map((item) => item.id))
        ).unwrap();
      } else if (isInDetail) {
        await dispatch(enableGroupDetail([data.id])).unwrap();
      } else {
        await dispatch(enableGroup([data.id])).unwrap();
      }
      SuccessAlert("Mở khóa nhóm thành công");
      setState(null);
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }
    setLoading(dispatchContext, false);
  };

  const handleStatusGroupChange = async () => {
    changeStatus();
  };
  const renderMenu = () => {
    if (typeButton === "menu") {
      return (
        <MDBox
          display="flex"
          flexDirection="row"
          alignItems="center"
          onClick={handleStatusGroupChange}
        >
          <Icon fontSize="medium" sx={{ mr: 1 }} color="success">
            lock_open
          </Icon>
          <MDTypography variant="subtitle2" fontSize="medium" color="success">
            Mở khóa
          </MDTypography>
        </MDBox>
      );
    }

    if (typeButton === "normal") {
      return (
        <MDButton variant="gradient" color="info" onClick={handleStatusGroupChange}>
          <Icon fontSize="medium" sx={{ mr: 1 }}>
            lock_open
          </Icon>
          <MDTypography variant="body2" fontSize="medium" fontWeight="regular" color="white">
            Mở khóa
          </MDTypography>
        </MDButton>
      );
    }

    return (
      <TooltipCustom title="Mở khóa">
        <MDButton
          variant="outlined"
          color="success"
          onClick={handleStatusGroupChange}
          iconOnly
          circular
        >
          <Icon sx={{ fontWeight: "bold" }}>lock_open</Icon>
        </MDButton>
      </TooltipCustom>
    );
  };

  return renderMenu();
}

EnableGroupButton.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired,
  typeButton: PropTypes.oneOf(["normal", "modern", "menu"]),
  isInDetail: PropTypes.bool,
  isMultiple: PropTypes.bool
};
export default EnableGroupButton;
