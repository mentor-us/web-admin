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
import {
  getCategoryItemsPerPageSelector,
  getIsSearchCategorySelector
} from "features/groupsCategory/selector";
import { searchByButton, searchCategory, updateSearchRequest } from "features/groupsCategory/slice";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { getValueOfList } from "utils";

import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert } from "components/SweetAlert";
import { groupCategoryStatusList } from "utils/constants";

function SearchBox() {
  /// --------------------- Khai báo Biến, State -------------

  const dispatch = useDispatch();
  const [, dispatchContext] = useMentorUs();
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState(null);
  const itemsPerPage = useSelector(getCategoryItemsPerPageSelector);
  const isSearch = useSelector(getIsSearchCategorySelector);

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
      await dispatch(searchCategory({ ...request, ...pageChangeInfo })).unwrap();
    } catch (error) {
      ErrorAlert(error?.message);
    }

    setLoading(dispatchContext, false);
  };

  const makeReqData = () => {
    const req = {};

    if (categoryName !== "") {
      req.name = categoryName;
    }

    if (status) {
      req.status = getValueOfList(groupCategoryStatusList, status, "label", "textValue");
    }

    return req;
  };

  const resetAllReqData = () => {
    setCategoryName("");
    setStatus(null);
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  useEffect(() => {
    if (!isSearch) {
      resetAllReqData();
    }
  }, [isSearch]);

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSearch = () => {
    const request = makeReqData();
    Search(request);
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
                  Loại nhóm
                </MDTypography>
                <MDInput
                  placeholder="Nhập loại nhóm"
                  size="small"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
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
                  options={groupCategoryStatusList.map((option) => option.label)}
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
