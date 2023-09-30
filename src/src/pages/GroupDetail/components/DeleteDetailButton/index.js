import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert, WarningAlertConfirm } from "components/SweetAlert";

import { deleteDetail } from "redux/groupDetail/slice";

function DeleteDetailButton({ type, data, setState }) {
  /// --------------------- Khai báo Biến, State -------------
  const { id } = useParams();
  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------
  const deleteUser = async () => {
    setLoading(dispatchContext, true);

    try {
      await dispatch(deleteDetail({ idGroup: id, idUser: data.id, type })).unwrap();
      setState(null);
      SuccessAlert("Xóa thành viên thành công");
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      } // check lai
    }
    setLoading(dispatchContext, false);
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------
  const handleDeleteUser = async () => {
    const title = "Xóa thành viên?";
    const html = `Bạn chắc chắn muốn xóa thành viên <b>${data.name}</b>?`;

    WarningAlertConfirm(title, html).then((result) => {
      if (result.isConfirmed) {
        deleteUser();
      }
      setState(null);
    });
  };

  /// --------------------------------------------------------
  return (
    <MDBox display="flex" flexDirection="row" onClick={handleDeleteUser} sx={{ width: "100%" }}>
      <Icon fontSize="medium" sx={{ mr: 1 }} color="error">
        delete
      </Icon>
      <MDTypography variant="subtitle2" fontSize="medium" color="error">
        Xóa
      </MDTypography>
    </MDBox>
  );
}

DeleteDetailButton.propTypes = {
  type: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  setState: PropTypes.func.isRequired
};

export default DeleteDetailButton;
