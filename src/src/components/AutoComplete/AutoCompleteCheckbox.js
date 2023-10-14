import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

import "./styles.css";

/**
 * AutoCompleteCheckbox
 * @description
 * Use this component to select multiple options from a list of options
 *
 * @param {string} placeholder - placeholder text for the input when no value is selected
 * @param {Array} options - array of options to select from
 * @param {Array} value - array of current selected values
 * @param {Object} sx - material ui sx prop
 * @param {Function} onChange - callback function when the value changes
 * @returns {React.JSX.Element}
 */
function AutoCompleteCheckbox({ placeholder, options, value, sx, onChange }) {
  return (
    <Autocomplete
      noOptionsText="Trống"
      multiple
      limitTags={1}
      options={options}
      sx={sx}
      value={value}
      onChange={(e, newValue) => {
        onChange(newValue);
      }}
      disableCloseOnSelect
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      getOptionLabel={(option) => option?.description}
      renderOption={(props, option, { selected }) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option?.description}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} placeholder={value.length > 0 ? "" : placeholder} size="small" />
      )}
    />
  );
}

// Setting default values for the props of AutoCompleteCheckbox
AutoCompleteCheckbox.defaultProps = {
  placeholder: "",
  value: [],
  sx: {}
};

AutoCompleteCheckbox.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]),
  options: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired,
  sx: PropTypes.instanceOf(Object),
  onChange: PropTypes.func.isRequired
};

export default AutoCompleteCheckbox;
