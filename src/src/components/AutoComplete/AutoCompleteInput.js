/* eslint-disable no-use-before-define */
import React from "react";
import { Chip, TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
// import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { isEmailValid } from "utils";

import { ErrorAlert } from "components/SweetAlert";

import "./styles.css";

const filter = createFilterOptions();

const removeDataFromCurrent = (allData, removedData, removedName) => {
  let newData = [...allData];
  let checkData = [...removedData];
  if (newData.length !== 0 && checkData.length !== 0) {
    checkData = checkData.filter((item) => item[removedName]);
    newData = newData.filter((item) => !checkData.includes(item));
  }

  return newData;
};
function AutoCompleteInput({ value, event, data, placeholder, checkValid, styleCSS, removedList }) {
  const { isFirst, setIsFirst, checkName } = checkValid;
  const { anotherData, removedName } = removedList;

  const handleValueChange = (e, newValue) => {
    if (newValue.length === 0) {
      event(newValue);
    } else {
      const newValueCopy = [...newValue];
      const email = newValueCopy[newValueCopy.length - 1];
      let emailToCheck = "";

      if (typeof email === "string") {
        emailToCheck = email;
        newValueCopy[newValueCopy.length - 1] = { email };
      } else {
        emailToCheck = email?.email;
      }

      if (isEmailValid(emailToCheck)) {
        if (value.length < newValue.length && value.find((item) => item.email === emailToCheck)) {
          ErrorAlert(`Email ${emailToCheck} đã được nhập, vui lòng nhập email khác!`);
          return;
        }
        event(newValueCopy);
      } else {
        ErrorAlert(`Email ${emailToCheck} vừa nhập không hợp lệ!`);
      }
    }

    setIsFirst({
      ...isFirst,
      [checkName]: false
    });
  };

  return (
    <Autocomplete
      noOptionsText="Trống"
      multiple
      limitTags={1}
      value={value || []}
      onChange={handleValueChange}
      sx={styleCSS}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={removeDataFromCurrent(data, anotherData, removedName)}
      freeSolo
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.email);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            email: inputValue,
            inputValue: ` + Thêm "${inputValue}"`
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.email;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          // value={inputTextValue}
          // onChange={handleChange}
          size="small"
          placeholder={value && value.length === 0 ? placeholder : ""}
          error={!isFirst[checkName] && (value === null || value.length === 0)}
          helperText={
            !isFirst[checkName] && (value === null || value.length === 0)
              ? "Vui lòng chọn ít nhất 1 giá trị"
              : ""
          }
        />
      )}
      renderTags={(val, getTagProps) =>
        val.map((option, index) => {
          return <Chip variant="outlined" label={option.email} {...getTagProps({ index })} />;
        })
      }
    />
  );
}

// Setting default values for the props of Breadcrumbs
AutoCompleteInput.defaultProps = {
  value: [],
  placeholder: "",
  styleCSS: {},
  removedList: {
    anotherData: [],
    removedName: ""
  },
  inputChange: false
};

AutoCompleteInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]),
  event: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired,
  placeholder: PropTypes.string,
  checkValid: PropTypes.shape({
    isFirst: PropTypes.instanceOf(Object),
    setIsFirst: PropTypes.func,
    checkName: PropTypes.string
  }).isRequired,
  styleCSS: PropTypes.instanceOf(Object),
  removedList: PropTypes.shape({
    anotherData: PropTypes.instanceOf(Array),
    removedName: PropTypes.string
  }),
  inputChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
};

export default AutoCompleteInput;
