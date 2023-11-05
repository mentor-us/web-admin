import React, { useState } from "react";
import { Backdrop, Divider, Fade, Icon, Modal } from "@mui/material";

import { isEmailValid } from "utils";
// import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import excel from "assets/images/excel.png";
// import { getEmailDomainsValidSelector } from "features/configuration/selector";
import template from "templates/Import_Emails_Group_Detail.xlsx";

import DropFileField from "components/DropFileField";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert, WarningAlertConfirmNotSavingData } from "components/SweetAlert";
import TooltipCustom from "components/Tooltip";
import { formatDateExcel } from "utils/formatDate";

// eslint-disable-next-line react/prop-types
function ImportEmailButton({ setData }) {
  /// --------------------- Khai báo Biến, State -------------
  const titleTooltip = "Import danh sách emails";
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [emails, setEmails] = useState(null);
  const [firstLoad, setFirstLoad] = useState({
    file: true
  });
  // const emailDomainsValid = useSelector(getEmailDomainsValidSelector);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const resetAllData = () => {
    setFile(null);
    setFirstLoad({
      file: true
    });
  };

  const isLostAllData = () => {
    if (file) {
      WarningAlertConfirmNotSavingData().then((result) => {
        if (result.isDenied) {
          setOpen(false);
          resetAllData();
        }
      });
    } else {
      setOpen(false);
      resetAllData();
    }
  };

  const extractDataFromExcel = () => {
    if (!(emails[0].length === 2 && emails[0][0] === "STT" && emails[0][1] === "Email")) {
      ErrorAlert(`Tập tin import không hợp lệ!`);
      return;
    }

    let data = emails
      .filter((item) => item[0] !== "STT" && item[0] !== undefined && item[1] !== undefined)
      .map((item) => item[1]);
    data = data.filter((item, index) => data.indexOf(item) === index);
    // .map((item) => {
    //   return {
    //     email: item
    //   };
    // });

    if (data.length > 0) {
      const checkEmailInvalid = data.filter((element) => !isEmailValid(element));
      if (checkEmailInvalid.length > 0) {
        ErrorAlert(`Email ${checkEmailInvalid[0]} trong tập tin tải lên không hợp lệ!`);
      } else {
        setData((oldVal) => [...oldVal, ...data]);
      }

      // setData((oldVal) => [...oldVal, ...data]);
    } else {
      ErrorAlert("Vui lòng nhập dữ liệu vào tập tin tải lên!");
    }
  };
  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  const handleOpen = () => setOpen(true);
  const handleClose = () => isLostAllData();

  const readFileToEmails = (result) => {
    if (!result) return;
    setFile(result);
    // read data from excel
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      setEmails(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(result);

    setFirstLoad({
      ...firstLoad,
      file: false
    });
  };

  const handleImport = () => {
    if (firstLoad.file && !file) {
      setFirstLoad({
        ...firstLoad,
        file: false
      });
      return;
    }

    if (file && emails && emails.length > 0) {
      extractDataFromExcel();
      setFile(null);
      setOpen(false);
    } else ErrorAlert("Vui lòng chọn tập tin chứa thông tin emails");
  };

  const handleDownloadTemplate = () => {
    const date = formatDateExcel();
    const outputFilename = `MentorUS_Import_Danh_sách_Emails_${date}.xlsx`;

    const link = document.createElement("a");
    link.href = template;
    link.setAttribute("download", outputFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /// --------------------------------------------------------

  return (
    <>
      <TooltipCustom title={titleTooltip}>
        <Icon
          style={{ cursor: "pointer", marginLeft: "8px" }}
          fontSize="medium"
          onClick={handleOpen}
        >
          upload_file
        </Icon>
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
          <MDBox sx={{ background: "white" }} className="group-modal__container">
            <MDTypography variant="h5" component="h2" textAlign="center" fontSize="25">
              Tải danh sách email
            </MDTypography>
            <Divider variant="middle" />
            <MDBox mt={3} mb={2} display="flex" flexDirection="column" alignItems="center">
              <DropFileField setState={readFileToEmails} />
              <MDBox sx={{ mt: 2 }}>
                <TooltipCustom title="Nhấn vào đây để tải xuống tập tin mẫu">
                  <MDButton
                    onClick={handleDownloadTemplate}
                    variant="outlined"
                    color="white"
                    sx={{
                      border: "2px solid #E9E8E8!important",
                      boxShadow: "none!important",
                      padding: "7px 15px!important"
                    }}
                  >
                    <img
                      src={excel}
                      alt=""
                      style={{ objectFit: "contain", width: "30px", marginRight: "5px" }}
                    />
                    <MDTypography
                      fontSize="16px"
                      color="light"
                      style={{
                        cursor: "pointer",
                        color: "black",
                        width: "fit-content",
                        textTransform: "none!important"
                      }}
                    >
                      Tải tập tin mẫu
                    </MDTypography>
                  </MDButton>
                </TooltipCustom>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="row" justifyContent="center" mt={4}>
              <MDButton onClick={handleImport} variant="contained" color="info" sx={{ mx: 1 }}>
                <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
                  Xác nhận
                </MDTypography>
              </MDButton>
              <MDButton onClick={handleClose} variant="contained" color="error" sx={{ mx: 1 }}>
                <Icon sx={{ fontWeight: "bold" }}>close</Icon>
                <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
                  Hủy
                </MDTypography>
              </MDButton>
            </MDBox>
          </MDBox>
        </Fade>
      </Modal>
    </>
  );
}

export default ImportEmailButton;
