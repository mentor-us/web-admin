/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Grid,
  Icon,
  TextField
} from "@mui/material";

import { setLoading } from "context";
import dayjs from "dayjs";
import { useMentorUs } from "hooks";

import CustomCheckbox from "components/Checkbox";
import BasicDatePicker from "components/DatePicker";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert } from "components/SweetAlert";
import useAuditLogStore, { actionTypeMap, domainTypeMap } from "hooks/client/useAuditLogStore.ts";
import { getAnotherDateFromToday } from "utils/formatDate";

function SearchBox() {
  const { setState } = useAuditLogStore();
  const [, dispatchContext] = useMentorUs();
  const today = dayjs();
  const [createdDateRange, setCreatedDateRange] = useState({
    from: today,
    to: today
  });
  const [innerSearchParams, setInnerSearchParams] = useState({
    name: "",
    email: "",
    domain: "",
    action: "",
    isFilterByCreatedDate: false
  });

  const Search = async () => {
    setLoading(dispatchContext, true);

    const params = {
      userName: innerSearchParams.name,
      userEmail: innerSearchParams.email,
      action: innerSearchParams.action,
      domain: innerSearchParams.domain,

      ...(innerSearchParams.isFilterByCreatedDate
        ? {
            from: dayjs(createdDateRange?.from).utc().toISOString(),
            to: dayjs(createdDateRange?.to).utc().toISOString()
          }
        : {})
    };

    try {
      setState("currentPageSearch", 0);
      setState("searchParams", params);
      setState("isSubmitSearch", true);
    } catch (error) {
      ErrorAlert(error?.message);
    } finally {
      setLoading(dispatchContext, false);
    }
  };

  const resetAllReqData = () => {
    setInnerSearchParams({
      name: "",
      email: "",
      domain: "",
      action: "",
      isFilterByCreatedDate: false
    });
    setCreatedDateRange({
      from: today,
      to: today
    });
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    resetAllReqData();
  }, []);

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
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MDBox className="relationship__searchBox-item">
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                    >
                      Tên người dùng
                    </MDTypography>
                    <MDInput
                      placeholder="Nhập tên người dùng"
                      size="small"
                      value={innerSearchParams.name}
                      onChange={(e) => {
                        setInnerSearchParams((prev) => ({ ...prev, name: e.target.value }));
                      }}
                      sx={{ width: "70%" }}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDBox className="relationship__searchBox-item">
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                    >
                      Email
                    </MDTypography>
                    <MDInput
                      placeholder="Nhập email"
                      size="small"
                      value={innerSearchParams.email}
                      onChange={(e) =>
                        setInnerSearchParams((prev) => ({ ...prev, email: e.target.value }))
                      }
                      sx={{ width: "70%" }}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDBox className="relationship__searchBox-item">
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                    >
                      Loại đối tượng
                    </MDTypography>
                    <Autocomplete
                      noOptionsText="Trống"
                      onChange={(e, newValue) => {
                        setInnerSearchParams((prev) => ({ ...prev, domain: newValue?.value }));
                      }}
                      sx={{
                        width: "70%",
                        pl: "0!important",
                        pt: "0!important"
                      }}
                      options={Object.entries(domainTypeMap).map(([key, value]) => ({
                        value: key,
                        label: value
                      }))}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      getOptionKey={(option) => option.value}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Chọn loại đối tượng" size="small" />
                      )}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDBox className="relationship__searchBox-item">
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                    >
                      Loại hành động
                    </MDTypography>
                    <Autocomplete
                      noOptionsText="Trống"
                      onChange={(e, newValue) => {
                        setInnerSearchParams((prev) => ({ ...prev, action: newValue?.value }));
                      }}
                      sx={{
                        width: "70%",
                        pl: "0!important",
                        pt: "0!important"
                      }}
                      options={Object.entries(actionTypeMap).map(([key, value]) => ({
                        value: key,
                        label: value
                      }))}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      getOptionKey={(option) => option.value}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Chọn loại hành động" size="small" />
                      )}
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MDBox className="group__searchBox-date">
                    <MDBox sx={{ mb: 2, width: "100%" }} display="flex" alignItems="center">
                      <CustomCheckbox
                        data={innerSearchParams.isFilterByCreatedDate}
                        action={() =>
                          setInnerSearchParams((prev) => ({
                            ...prev,
                            isFilterByCreatedDate: !prev.isFilterByCreatedDate
                          }))
                        }
                      />
                      <MDTypography
                        variant="body2"
                        fontWeight="regular"
                        color="dark"
                        sx={{ ml: 2, fontSize: "16px" }}
                      >
                        Ngày thực hiện
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      sx={{ width: "100%" }}
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                    >
                      <BasicDatePicker
                        value={createdDateRange}
                        event={setCreatedDateRange}
                        type="from"
                        // minDate={getAnotherDateFromToday(startDay.from, -4, "year")}
                        maxDate={getAnotherDateFromToday(createdDateRange.to, 0, "year")}
                        disabled={!innerSearchParams.isFilterByCreatedDate}
                      />
                      <MDTypography variant="body2" fontWeight="light" sx={{ mx: 1 }}>
                        đến
                      </MDTypography>
                      <BasicDatePicker
                        value={createdDateRange}
                        event={setCreatedDateRange}
                        type="to"
                        minDate={getAnotherDateFromToday(createdDateRange.from, 0, "year")}
                        disabled={!innerSearchParams.isFilterByCreatedDate}
                      />
                    </MDBox>
                  </MDBox>
                </Grid>
              </Grid>
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
