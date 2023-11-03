import React, { useState } from "react";
import { Backdrop, Box, Divider, Fade, Icon, Modal, Typography } from "@mui/material";
import { PropTypes } from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import CustomCheckbox from "components/Checkbox";
import MDBox from "components/MDComponents/MDBox";
// import { useDispatch } from "react-redux";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, SuccessAlert } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";
import statisticServices from "service/statisticService";
import { formatDateExcel } from "utils/formatDate";

function ExportButton({ groupId }) {
  /// --------------------- Khai báo Biến, State -------------

  // const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [open, setOpen] = useState(false);

  const [meetingChecked, setMeetingChecked] = useState(true);
  const [taskChecked, setTaskChecked] = useState(true);
  const [chatChecked, setChatChecked] = useState(true);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const resetAllData = () => {
    setChatChecked(true);
    setMeetingChecked(true);
    setTaskChecked(true);
  };

  const resetAllState = () => {
    setOpen(false);
    resetAllData();
  };

  const isFailCase = () => {
    if (!meetingChecked && !chatChecked && !taskChecked) {
      ErrorAlert("Vui lòng chọn ít nhất 1 trường thông tin để xuất hoạt động!");
      return true;
    }

    return false;
  };

  const makeReqData = () => {
    const req = {
      groupId
    };

    const queryArray = [];
    if (meetingChecked) {
      queryArray.push("MEETINGS");
    }

    if (chatChecked) {
      queryArray.push("MESSAGES");
    }

    if (taskChecked) {
      queryArray.push("TASKS");
    }

    req.query = queryArray.join(",");

    return req;
  };

  const exportStatistic = async (req, type) => {
    setLoading(dispatchContext, true);
    const date = formatDateExcel();
    let outputFilename;
    let response;
    try {
      if (type === 1) {
        response = await statisticServices.exportStatistic(req);
        outputFilename = `MentorUS_Báo_cáo_hoạt_động_nhóm_${date}.pdf`;
      } else {
        response = await statisticServices.exportLog(req);
        // Wrong extension for excel file
        // outputFilename = `MentorUS_Chi_tiết_thông_tin_hoạt_động_nhóm_${date}.txt`;
        outputFilename = `MentorUS_Chi_tiết_thông_tin_hoạt_động_nhóm_${date}.xlsx`;
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

      SuccessAlert("Xuất hoạt động của nhóm thành công");
      resetAllState();
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // eslint-disable-next-line no-unused-vars
  const handleImport = (type) => (e) => {
    if (!isFailCase()) {
      const req = makeReqData();
      exportStatistic(req, type);
    }
  };

  /// --------------------------------------------------------

  return (
    <div>
      <TooltipCustom title="Xuất hoạt động chi tiết về nhóm">
        <MDButton
          onClick={handleOpen}
          variant="outlined"
          color="warning"
          iconOnly
          circular
          sx={{ mx: 2 }}
        >
          <Icon sx={{ fontWeight: "bold" }}>get_app</Icon>
        </MDButton>
      </TooltipCustom>
      <Modal
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box className="group-modal__container" sx={{ width: "600px" }}>
            <Typography
              id="transition-modal-title"
              textAlign="center"
              fontSize="25px"
              variant="h5"
              component="h2"
            >
              Xuất hoạt động về nhóm
            </Typography>
            <Divider />
            <MDBox
              mt={2}
              mb={2}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <MDTypography
                variant="body2"
                fontWeight="regular"
                sx={{ pl: 0.5, mb: 1, fontSize: "18px" }}
              >
                Vui lòng chọn thông tin cần xuất:
              </MDTypography>
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <MDBox display="flex" flexDirection="row" alignItems="center" px={4} py={0.5}>
                  <CustomCheckbox data={meetingChecked} action={setMeetingChecked} />
                  <MDTypography variant="body2" fontWeight="regular" sx={{ ml: 1.5 }}>
                    Lịch hẹn
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" flexDirection="row" alignItems="center" px={4} py={0.5}>
                  <CustomCheckbox data={taskChecked} action={setTaskChecked} />
                  <MDTypography variant="body2" fontWeight="regular" sx={{ ml: 1.5 }}>
                    Công việc
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" flexDirection="row" alignItems="center" px={4} py={0.5}>
                  <CustomCheckbox data={chatChecked} action={setChatChecked} />
                  <MDTypography variant="body2" fontWeight="regular" sx={{ ml: 1.5 }}>
                    Tin nhắn
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="row" justifyContent="center" mt={4}>
              <TooltipCustom title="Xuất các số liệu và thông tin cơ bản về nhóm (không bao gồm nội dung chi tiết của các thông tin được chọn)">
                <MDButton onClick={handleImport(1)} variant="contained" color="info" sx={{ mx: 1 }}>
                  <Icon sx={{ fontWeight: "bold" }}>get_app</Icon>
                  <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
                    Xuất báo cáo
                  </MDTypography>
                </MDButton>
              </TooltipCustom>
              <TooltipCustom title="Xuất nội dung chi tiết (logs) về thông tin được chọn của nhóm">
                <MDButton
                  onClick={handleImport(2)}
                  variant="contained"
                  color="warning"
                  sx={{ mx: 1 }}
                >
                  <Icon sx={{ fontWeight: "bold" }}>sim_card_download</Icon>
                  <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
                    Xuất chi tiết
                  </MDTypography>
                </MDButton>
              </TooltipCustom>
              <MDButton onClick={handleClose} variant="contained" color="error" sx={{ mx: 1 }}>
                <Icon sx={{ fontWeight: "bold" }}>close</Icon>
                <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
                  Hủy
                </MDTypography>
              </MDButton>
            </MDBox>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

ExportButton.propTypes = {
  groupId: PropTypes.string.isRequired
};

export default ExportButton;
