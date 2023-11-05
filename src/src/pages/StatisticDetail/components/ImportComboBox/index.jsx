import React, { useState } from "react";
import { Backdrop, Box, Divider, Fade, Icon, Modal, Typography } from "@mui/material";

import englishCertFile from "templates/Statistic/Import_Statistic_English_Cert.xlsx";
import statisticFile from "templates/Statistic/Import_Statistic_Point.xlsx";
import studyingPointFile from "templates/Statistic/Import_Statistic_Studying_Point.xlsx";
import trainingPointFile from "templates/Statistic/Import_Statistic_Training_Point.xlsx";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
// import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { formatDateExcel } from "utils/formatDate";

import ImportStatisticPointButton from "../ImportButton";

function ImportComboBox() {
  /// --------------------- Khai báo Biến, State -------------
  const [open, setOpen] = useState(false);
  const date = formatDateExcel();
  const importLists = [
    {
      templateFileName: `Import_Statistic_${date}.xlsx`,
      template: statisticFile,
      typeImport: 1
    },
    {
      templateFileName: `Import_Statistic_Training_Point_${date}.xlsx`,
      template: trainingPointFile,
      typeImport: 2
    },
    {
      templateFileName: `Import_Statistic_English_Cert_${date}.xlsx`,
      template: englishCertFile,
      typeImport: 3
    },
    {
      templateFileName: `Import_Statistic_Studying_Point_${date}.xlsx`,
      template: studyingPointFile,
      typeImport: 4
    }
  ];

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// --------------------------------------------------------

  return (
    <div>
      <MDButton onClick={handleOpen} variant="gradient" color="warning">
        <Icon sx={{ fontWeight: "bold" }}>file_upload</Icon>
        <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
          Import
        </MDTypography>
      </MDButton>
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
              Chọn cách import danh sách cập nhật
            </Typography>
            <Divider />
            <MDBox
              mt={3}
              mb={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              {importLists.map((item) => (
                <ImportStatisticPointButton
                  key={item.template}
                  templateFileName={item.templateFileName}
                  template={item.template}
                  typeImport={item.typeImport}
                  setState={setOpen}
                />
              ))}
            </MDBox>
            <MDBox display="flex" flexDirection="row" justifyContent="center" mt={4}>
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

export default ImportComboBox;
