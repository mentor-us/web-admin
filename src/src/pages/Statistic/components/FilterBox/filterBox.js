import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Card, TextField } from "@mui/material";

import { setLoading } from "context";
import { useMentorUs } from "hooks";
import { getValueOfList } from "utils";

import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import { ErrorAlert } from "components/SweetAlert";

import { allCategoriesSelector } from "redux/groupsCategory/selector";
import { getStatisticItemsPerPageSelector } from "redux/statistic/selector";
import { filterStatistic, updateFilterValue } from "redux/statistic/slice";

function FilterBox() {
  const listCategories = useSelector(allCategoriesSelector);

  const allCategories = [{ id: "", name: "Tất cả" }, ...listCategories];
  const [category, setCategory] = useState("Tất cả");
  const [, dispatchContext] = useMentorUs();
  const dispatch = useDispatch();
  const itemsPerPage = useSelector(getStatisticItemsPerPageSelector);

  const handleFilter = async (filterValue) => {
    setLoading(dispatchContext, true);
    const pageChangeInfo = {
      page: 0,
      size: itemsPerPage
    };
    const request = { groupCategory: filterValue };
    try {
      dispatch(updateFilterValue(filterValue));

      await dispatch(filterStatistic({ ...request, ...pageChangeInfo }));
    } catch (error) {
      if (error?.message !== "401") {
        ErrorAlert(error?.message);
      }
    }
    setLoading(dispatchContext, false);
  };
  const handleChangeGroupCategory = (categoryName) => {
    const filterCategoryValue = getValueOfList(allCategories, categoryName, "name", "id");

    if (categoryName !== "") {
      setCategory(categoryName);
      handleFilter(filterCategoryValue);
    }
  };

  return (
    <MDBox mb={1}>
      <Card sx={{ p: 2 }}>
        <MDTypography
          variant="h5"
          // fontWeight="regular"
          // color="dark"
          sx={{ mr: 2, mb: 1, width: "30%" }}
        >
          Lọc theo loại nhóm
        </MDTypography>
        <Autocomplete
          noOptionsText="Trống"
          value={category}
          onChange={(e, newValue) => handleChangeGroupCategory(newValue)}
          sx={{
            width: "30%",
            pl: "0!important",
            pt: "0!important"
          }}
          color="text"
          options={allCategories?.map((option) => option.name)}
          renderInput={(params) => <TextField {...params} size="small" />}
          // isOptionEqualToValue={(option, newValue) => {
          //   return option.id === newValue.id;
          // }}
          // defaultValue={allCategories[0].name}
          disableClearable
        />
      </Card>
    </MDBox>
  );
}

export default FilterBox;
