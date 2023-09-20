/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import "./styles.css";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AutoCompleteCheckbox({ label, value, event, data, styleCSS }) {
  return (
    <Autocomplete
      noOptionsText="Trống"
      multiple
      limitTags={1}
      options={data}
      sx={styleCSS}
      value={value || []}
      onChange={(e, newValue) => {
        event(newValue);
      }}
      disableCloseOnSelect
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      getOptionLabel={(option) => option?.description}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option?.description}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} placeholder={value.length > 0 ? "" : label} size="small" />
      )}
    />
  );
}

// Setting default values for the props of Breadcrumbs
AutoCompleteCheckbox.defaultProps = {
  label: "",
  value: [],
  styleCSS: {}
};

AutoCompleteCheckbox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]),
  event: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired,
  styleCSS: PropTypes.instanceOf(Object)
};

export default AutoCompleteCheckbox;
