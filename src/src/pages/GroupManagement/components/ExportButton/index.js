import React from "react";
import { Icon } from "@mui/material";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { SuccessAlert, ErrorAlert } from "components/SweetAlert";

import {
  getGroupColumnHeadersSelector,
  getGroupSearchRequestSelector,
  getIsSearchGroupSelector
} from "redux/groups/selector";

import { useMaterialUIController, setLoading } from "context";

import { formatDateExcel } from "utils/formatDate";
import groupsServices from "service/groupsServices";

function ExportButton({ isDisabled }) {
  const [, dispatchContext] = useMaterialUIController();
  const columnsHeaders = useSelector(getGroupColumnHeadersSelector);
  const searchRequest = useSelector(getGroupSearchRequestSelector);
  const isSearch = useSelector(getIsSearchGroupSelector);

  const exportGroup = async (req) => {
    setLoading(dispatchContext, true);
    const date = formatDateExcel();
    const outputFilename = `MentorUS_Danh_sách_nhóm_${date}.xlsx`;

    try {
      let response;
      if (isSearch) {
        response = await groupsServices.exportGroupSearch(req);
      } else {
        response = await groupsServices.exportGroup(req);
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

      SuccessAlert("Xuất danh sách nhóm thành công");
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
  };
  const handleExportGroup = () => {
    const columnExport = columnsHeaders
      .filter((item) => item.isShow)
      .map((item) => item.textValue)
      .join(",");

    let req = {};
    if (isSearch) {
      req = { ...searchRequest, remainColumns: columnExport };
    } else {
      req = { remainColumns: columnExport };
    }

    exportGroup(req);
  };

  return (
    <MDButton
      sx={{ ml: 1 }}
      onClick={handleExportGroup}
      variant="gradient"
      color="info"
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
  isDisabled: PropTypes.bool.isRequired
};

export default ExportButton;
