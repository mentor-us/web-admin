import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "@mui/material";
import { getAccountColumnHeadersSelector } from "features/accounts/selector";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert } from "components/SweetAlert";
import accountServices from "service/accountServices";
import { roleMemberEnum } from "utils/constants";
import { formatDateExcel } from "utils/formatDate";

function ExportButton({ type, userId, isDisabled }) {
  const [, dispatchContext] = useMentorUs();
  const columnsHeaders = useSelector(getAccountColumnHeadersSelector);

  const exportExcel = async (req) => {
    setLoading(dispatchContext, true);
    const date = formatDateExcel();
    const outputFilename =
      type === roleMemberEnum.mentor
        ? `MentorUS_Danh_sách_nhóm_quản_lý_của_tài_khoản_${date}.xlsx`
        : `MentorUS_Danh_sách_nhóm_thành_viên_của_tài_khoản_${date}.xlsx`;
    const successTitle =
      type === roleMemberEnum.mentor
        ? `Xuất danh sách nhóm quản lý của tài khoản thành công`
        : `Xuất danh sách nhóm thành viên của tài khoản thành công`;

    try {
      let response;
      if (type === roleMemberEnum.mentor) {
        response = await accountServices.exportAccountMentor(userId, req);
      } else {
        response = await accountServices.exportAccountMentee(userId, req);
      }
      if (response) {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", outputFilename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      SuccessAlert(successTitle);
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
  };
  const handleExport = () => {
    const columnExport = columnsHeaders
      .filter((item) => item.isShow)
      .map((item) => item.textValue)
      .join(",");
    exportExcel({ remainColumns: columnExport });
  };

  return (
    <MDButton
      sx={{ ml: 1 }}
      onClick={handleExport}
      variant="gradient"
      color="warning"
      disabled={isDisabled}
    >
      <Icon sx={{ fontWeight: "bold" }}>file_download</Icon>
      <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
        Xuất excel
      </MDTypography>
    </MDButton>
  );
}

ExportButton.propTypes = {
  type: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

export default ExportButton;
