import React from "react";
import { Chip, TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import PropTypes from "prop-types";

import { isEmailValid } from "utils";

import { ErrorAlert } from "components/SweetAlert";

import "./styles.css";

const filter = createFilterOptions();

const suggestionPrefix = " + Thêm ";
const addSuggestionPrefix = (value) => suggestionPrefix + value;
// Clear suggestion prefix and ""
const removeSuggestionPrefix = (value) => value.replace(suggestionPrefix, "").replace(/"/g, "");

/**
 * AutoCompleteEmailInput
 * @description
 * AutoCompleteEmailInput is a component that allows users to select one or more options from a predefined list.
 *
 * @param {string} placeholder - Placeholder for input
 * @param {array} value - List of selected values
 * @param {array} data - List of data to select
 * @param {function} onChange - onChange callback when value change
 * @param {object} sx - Style object
 * @param {boolean} error - Error state
 * @param {string} helperText - Helper text when error state is true
 * @returns {React.JSX.Element}
 */
function AutoCompleteEmailInput({ value, onChange, data, placeholder, sx, error, helperText }) {
  const handleValueChange = (e, emails) => {
    // If empty, call onChange
    if (emails.length === 0) {
      onChange(emails);
      return;
    }

    // Check last email is valid
    let lastEmail = emails.pop();
    // If last email is suggestion, remove it
    lastEmail = lastEmail.suggestion ? removeSuggestionPrefix(lastEmail.suggestion) : lastEmail;
    if (!isEmailValid(lastEmail)) {
      ErrorAlert(`Email ${lastEmail} vừa nhập không hợp lệ!`);
      return;
    }

    // If last email is not in the list, add it, avoid duplicate
    if (!emails.includes(lastEmail)) {
      emails.push(lastEmail);
    }
    onChange(emails);
  };

  /// --------------------------------------------------------
  return (
    <Autocomplete
      noOptionsText="Trống"
      multiple
      limitTags={1}
      value={value || []}
      onChange={handleValueChange}
      sx={sx}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={data}
      freeSolo
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        if (inputValue === "") {
          return filtered;
        }

        // Suggest the creation of a new value
        const isExist = options.some((option) => inputValue === option);
        if (!isExist) {
          filtered.push({
            suggestion: addSuggestionPrefix(inputValue.trim())
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
        if (option.suggestion) {
          return option.suggestion;
        }
        // Regular option
        return option;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder={value && value.length === 0 ? placeholder : ""}
          error={error}
          helperText={helperText}
        />
      )}
      renderTags={(val, getTagProps) =>
        val.map((option, index) => {
          if (option.suggestion) {
            return (
              <Chip
                variant="outlined"
                label={removeSuggestionPrefix(option.suggestion)}
                {...getTagProps({ index })}
              />
            );
          }
          return <Chip variant="outlined" label={option} {...getTagProps({ index })} />;
        })
      }
    />
  );
}

AutoCompleteEmailInput.defaultProps = {
  value: [],
  placeholder: "",
  sx: {},
  error: false,
  helperText: ""
};

AutoCompleteEmailInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]),
  onChange: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired,
  placeholder: PropTypes.string,
  sx: PropTypes.instanceOf(Object),
  error: PropTypes.bool,
  helperText: PropTypes.string
};

export default AutoCompleteEmailInput;
