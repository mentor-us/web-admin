import React from "react";
import { Icon } from "@mui/material";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { SuccessAlert, ErrorAlert } from "components/SweetAlert";

import { getAccountColumnHeadersSelector } from "redux/accounts/selector";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { formatDateExcel } from "utils/formatDate";
import { roleMemberEnum } from "utils/constants";
import groupsServices from "service/groupsServices";

function ExportButton({ type, groupId, isDisabled }) {
  const [, dispatchContext] = useMentorUs();
  const columnsHeaders = useSelector(getAccountColumnHeadersSelector);

  const exportExcel = async (req) => {
    setLoading(dispatchContext, true);
    const date = formatDateExcel();
    const outputFilename =
      type === roleMemberEnum.mentor
        ? `MentorUS_Danh_sách_Mentor_của_nhóm_${date}.xlsx`
        : `MentorUS_Danh_sách_Mentee_của_nhóm_${date}.xlsx`;
    const successTitle =
      type === roleMemberEnum.mentor
        ? `Xuất danh sách Mentor của nhóm thành công`
        : `Xuất danh sách Mentee của nhóm thành công`;

    try {
      let response;
      if (type === roleMemberEnum.mentor) {
        response = await groupsServices.exportGroupMentor(groupId, req);
      } else {
        response = await groupsServices.exportGroupMentee(groupId, req);
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
  groupId: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

export default ExportButton;
