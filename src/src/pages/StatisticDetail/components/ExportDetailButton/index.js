import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "@mui/material";
import { PropTypes } from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert } from "components/SweetAlert";
import statisticServices from "service/statisticService";
import { formatDateExcel } from "utils/formatDate";

import {
  getIsSearchStatisticDetailSelector,
  getStatisticDetailColumnHeadersSelector,
  getStatisticDetailSearchRequestSelector
} from "redux/statisticDetail/selector";

function ExportDetailButton({ groupId, isDisabled }) {
  const [, dispatchContext] = useMentorUs();
  const columnsHeaders = useSelector(getStatisticDetailColumnHeadersSelector);
  const isSearch = useSelector(getIsSearchStatisticDetailSelector);
  const searchRequest = useSelector(getStatisticDetailSearchRequestSelector);

  const exportExcel = async (req) => {
    setLoading(dispatchContext, true);
    const date = formatDateExcel();
    const outputFilename = `MentorUS_Danh_sách_hoạt_động_thành_viên_của_nhóm_${date}.xlsx`;

    try {
      let response;
      if (isSearch) {
        response = await statisticServices.exportGroupStatisticDetailSearch(req, groupId);
      } else {
        response = await statisticServices.exportGroupStatisticDetail(req, groupId);
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

      SuccessAlert("Xuất danh sách hoạt động nhóm thành công");
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

ExportDetailButton.propTypes = {
  groupId: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

export default ExportDetailButton;
