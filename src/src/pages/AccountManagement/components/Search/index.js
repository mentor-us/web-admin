import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { useMentorUs } from "hooks";
import { isEmailValid } from "utils";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert } from "components/SweetAlert";
// import { getEmailDomainsValidSelector } from "redux/configuration/selector";
import { accountStatusList, roleAccountList } from "utils/constants";

import {
  getAccountItemsPerPageSelector,
  getIsSearchAccountSelector
} from "redux/accounts/selector";
import { searchAccount, searchByButton, updateSearchRequest } from "redux/accounts/slice";
import { getCurrentUserSelector } from "redux/currentUser/selector";

function SearchBox() {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const isSearch = useSelector(getIsSearchAccountSelector);
  const [, dispatchContext] = useMentorUs();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  // const emailDomainsValid = useSelector(getEmailDomainsValidSelector);
  const itemsPerPage = useSelector(getAccountItemsPerPageSelector);
  const currentAccount = useSelector(getCurrentUserSelector);
  const roleList =
    currentAccount.role === "SUPER_ADMIN"
      ? roleAccountList?.map((option) => option.role)
      : roleAccountList
          ?.filter((item) => item.textValue !== "SUPER_ADMIN")
          .map((option) => option.role);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const Search = async (request) => {
    setLoading(dispatchContext, true);

    const pageChangeInfo = {
      page: 0,
      size: itemsPerPage
    };

    try {
      dispatch(updateSearchRequest(request));
      dispatch(searchByButton(true));
      await dispatch(searchAccount({ ...request, ...pageChangeInfo })).unwrap();
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }

    setLoading(dispatchContext, false);
  };

  const isFailCase = () => {
    if (email !== "" && !isEmailValid(email)) {
      ErrorAlert("Email không hợp lệ!");
      return true;
    }

    return false;
  };

  const makeReqData = () => {
    const req = {};

    if (email !== "") {
      req.emailSearch = email;
    }

    if (fullName !== "") {
      req.name = fullName;
    }

    if (status) {
      req.status = accountStatusList.find((item) => item.label === status).value;
    }

    if (role) {
      req.role = roleAccountList.find((item) => item.role === role).textValue;
    }

    return req;
  };

  const resetSearchRequest = () => {
    setFullName("");
    setEmail("");
    setRole(null);
    setStatus(null);
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    if (!isSearch) {
      resetSearchRequest();
    }
  }, [isSearch]);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSearch = () => {
    if (!isFailCase()) {
      const request = makeReqData();
      Search(request);
    }
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
          <Grid container columnSpacing={10} rowSpacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6} lg={6}>
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
                  value={fullName}
                  onChange={handleFullNameChange}
                  sx={{ width: "70%" }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
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
                  value={email}
                  onChange={handleEmailChange}
                  sx={{ width: "70%" }}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container columnSpacing={10} rowSpacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox className="relationship__searchBox-item">
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                >
                  Vai trò
                </MDTypography>
                <Autocomplete
                  noOptionsText="Trống"
                  value={role}
                  onChange={(e, newValue) => {
                    setRole(newValue);
                  }}
                  sx={{
                    width: "70%",
                    pl: "0!important",
                    pt: "0!important"
                  }}
                  color="text"
                  options={roleList}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Chọn vai trò" size="small" />
                  )}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox className="relationship__searchBox-item">
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  color="dark"
                  sx={{ mr: 2, width: "30%", fontSize: "16px" }}
                >
                  Trạng thái
                </MDTypography>
                <Autocomplete
                  noOptionsText="Trống"
                  value={status}
                  onChange={(e, newValue) => {
                    setStatus(newValue);
                  }}
                  sx={{
                    width: "70%",
                    pl: "0!important",
                    pt: "0!important"
                  }}
                  color="text"
                  options={accountStatusList?.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Chọn trạng thái" size="small" />
                  )}
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
            <MDButton variant="contained" color="info" onClick={handleSearch}>
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
