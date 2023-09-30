import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, WarningAlertConfirm } from "components/SweetAlert";

import { setRoleMember } from "redux/groupDetail/slice";

function SetRoleButton({ type, data, setState }) {
  /// --------------------- Khai báo Biến, State -------------
  const { id } = useParams();
  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const setRoleUser = async () => {
    setLoading(dispatchContext, true);

    try {
      await dispatch(setRoleMember({ idGroup: id, idUser: data.id, type })).unwrap();
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

  const handleSetRoleUser = async () => {
    const title = "Thay đổi vai trò trong Nhóm";
    const html = `Bạn chắc chắn muốn thay đổi vai trò thành  <b>${
      type === 0 ? "mentor" : "mentee"
    }</b> cho thành viên <b>${data.name}</b>?`;
    WarningAlertConfirm(title, html).then((result) => {
      if (result.isConfirmed) {
        setRoleUser();
      }
      setState(null);
    });
  };

  /// --------------------------------------------------------

  return type === 0 ? (
    <MDBox
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      onClick={handleSetRoleUser}
      sx={{ width: "100%" }}
    >
      <Icon fontSize="medium" sx={{ mr: 1 }} color="warning">
        keyboard_double_arrow_up
      </Icon>
      <MDTypography variant="subtitle2" fontSize="medium" color="warning">
        Chuyển thành Mentor
      </MDTypography>
    </MDBox>
  ) : (
    <MDBox
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      onClick={handleSetRoleUser}
    >
      <Icon fontSize="medium" sx={{ mr: 1 }} color="warning">
        keyboard_double_arrow_down
      </Icon>
      <MDTypography variant="subtitle2" fontSize="medium" color="warning">
        Chuyển thành Mentee
      </MDTypography>
    </MDBox>
  );
}

SetRoleButton.propTypes = {
  type: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.instanceOf(Object).isRequired
};

export default SetRoleButton;
