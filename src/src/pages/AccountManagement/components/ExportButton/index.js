import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "@mui/material";
import { PropTypes } from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert } from "components/SweetAlert";
import accountServices from "service/accountServices";
import { formatDateExcel } from "utils/formatDate";

import {
  getAccountColumnHeadersSelector,
  getAccountSearchRequestSelector,
  getIsSearchAccountSelector
} from "redux/accounts/selector";

function ExportButton({ isDisabled }) {
  const [, dispatchContext] = useMentorUs();
  const columnsHeaders = useSelector(getAccountColumnHeadersSelector);
  const isSearch = useSelector(getIsSearchAccountSelector);
  const searchRequest = useSelector(getAccountSearchRequestSelector);

  const exportExcel = async (req) => {
    setLoading(dispatchContext, true);
    const date = formatDateExcel();
    const outputFilename = `MentorUS_Danh_sách_tài_khoản_${date}.xlsx`;

    try {
      let response;

      if (isSearch) {
        response = await accountServices.exportAccountSearch(req);
      } else {
        response = await accountServices.exportAccount(req);
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

      SuccessAlert("Xuất danh sách tài khoản thành công");
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

    let req = {};
    if (isSearch) {
      req = { ...searchRequest, remainColumns: columnExport };
    } else {
      req = { remainColumns: columnExport };
    }
    exportExcel(req);
  };

  return (
    <MDButton
      sx={{ ml: 1 }}
      onClick={handleExport}
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
