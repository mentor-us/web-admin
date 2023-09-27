import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Icon } from "@mui/material";
import MDTypography from "components/MDComponents/MDTypography";
import MDBox from "components/MDComponents/MDBox";
import { SuccessAlert, ErrorAlert, WarningAlertConfirm } from "components/SweetAlert";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
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
