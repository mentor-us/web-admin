import React, { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Icon } from "@mui/material";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert } from "components/SweetAlert";
import useSubjectManagementStore from "hooks/client/useSubjectManagementStore";

function SearchBox() {
  /// --------------------- Khai báo Biến, State -------------

  const [, dispatchContext] = useMentorUs();
  const [subjectName, setSubjectName] = useState("");

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------
  const { setState } = useSubjectManagementStore();

  const Search = async () => {
    setLoading(dispatchContext, true);

    try {
      setState("currentPageSearch", 0);
      setState("isSubmitSearch", true);
      // await dispatch(searchSubject({ ...request, ...pageChangeInfo })).unwrap();
    } catch (error) {
      ErrorAlert(error?.message);
    }

    setLoading(dispatchContext, false);
  };

  const resetAllReqData = () => {
    setSubjectName("");
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    resetAllReqData();
  }, []);
  useEffect(() => {
    setState("query", subjectName);
  }, [subjectName]);
  const handleSubjectNameChange = (e) => {
    setSubjectName(e.target.value);
  };

  return (
    <MDBox>
      <Accordion className="group__search-box" style={{ padding: "8px" }}>
        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
          <MDTypography variant="h5" gutterBottom sx={{ mb: 0 }}>
            Tìm kiếm
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container columnSpacing={10} rowSpacing={3} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox className="relationship__searchBox-item">
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                >
                  Tên / Mã môn
                </MDTypography>
                <MDInput
                  placeholder="Nhập tên / mã môn"
                  size="small"
                  value={subjectName}
                  onChange={handleSubjectNameChange}
                  sx={{ width: "70%" }}
                />
              </MDBox>
            </Grid>
          </Grid>
          <MDBox
            mt={1}
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <MDButton variant="contained" color="info" onClick={Search}>
              <Icon sx={{ fontWeight: "bold" }}>search</Icon>
              <MDTypography variant="body2" fontWeight="regular" color="white" sx={{ pl: 0.5 }}>
                Tìm kiếm
              </MDTypography>
            </MDButton>
          </MDBox>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default SearchBox;
