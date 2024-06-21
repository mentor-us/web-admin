import React from "react";
// import { useSelector } from "react-redux";
// import { Autocomplete, TextField } from "@mui/material";
// import { allCategoriesSelector } from "features/groupsCategory/selector";
import PropTypes from "prop-types";

// import { getValueOfList, removeCategoryFromObject } from "utils";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";

import "./styles.css";

function DeleteOptions({ data, state, setState }) {
  const { type, category } = state;
  console.log(data, category);
  // const allCategories = removeCategoryFromObject(useSelector(allCategoriesSelector), data);

  const handleChange = (e) => {
    e.persist();
    const { value } = e.target;

    setState({ ...state, type: value });
  };

  // const handleCategory = (e, newValue) => {
  //   setState({ ...state, category: getValueOfList(allCategories, newValue, "name") });
  // };

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDBox className="delete-options__container">
        <input
          type="radio"
          value="option 1"
          onChange={handleChange}
          checked={type === "option 1"}
          className="delete-options__form-radio-input"
        />
        <MDTypography variant="body1" name="test1" color="dark" sx={{ fontSize: "1.15rem", ml: 2 }}>
          <b>Xóa</b> tất cả <b>các điểm số thuộc</b> môn học hiện tại.
        </MDTypography>
      </MDBox>
      {/* <MDBox className="delete-options__container">
        <input
          type="radio"
          value="option 2"
          onChange={handleChange}
          checked={type === "option 2"}
          className="delete-options__form-radio-input"
        />
        <MDBox display="flex" flexDirection="column" ml={2}>
          <MDTypography variant="body1" color="dark" sx={{ fontSize: "1.15rem", mb: 1 }}>
            <b>Trước khi xóa, Chuyển</b> tất cả <b>các nhóm thuộc</b> môn học này sang môn học khác:
          </MDTypography>
          <Autocomplete
            noOptionsText="Trống"
            value={category?.name || null}
            onChange={handleCategory}
            options={allCategories.map((item) => item.name)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} size="small" placeholder="Chọn môn học" />
            )}
            disabled={type !== "option 2"}
          />
        </MDBox>
      </MDBox> */}
    </MDBox>
  );
}

DeleteOptions.propTypes = {
  data: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.instanceOf(Array)]).isRequired,
  state: PropTypes.shape({
    type: PropTypes.oneOf(["option 1", "option 2"]),
    category: PropTypes.instanceOf(Object)
  }).isRequired,
  setState: PropTypes.func.isRequired
};

export default DeleteOptions;
