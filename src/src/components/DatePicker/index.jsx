import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";

import MDInput from "components/MDComponents/MDInput";
// import { getGroupStatusList } from "utils";
// import { formatDate } from "utils/formatDate";

function BasicDatePicker({
  value,
  event,
  type = null,
  minDate,
  maxDate,
  checkValid,
  disabled
  // setGroupStatus,
  // status
}) {
  const currentValue = type ? value[type] : value;
  const { isFirst, setIsFirst, checkName } = checkValid;

  const handleNewValue = (newValue) => {
    const date = new Date(newValue);

    // if (setGroupStatus) {
    //   if (status !== "OUTDATED") {
    //     if (date.getTime() < new Date().getTime()) setGroupStatus(getGroupStatusList());
    //     else setGroupStatus(getGroupStatusList("OUTDATED"));
    //   }
    // }

    if (type) {
      const updatedVal = {};
      updatedVal[type] = date;

      event((oldVal) => ({
        ...oldVal,
        ...updatedVal
      }));
    } else {
      event(date);
    }

    setIsFirst({
      ...isFirst,
      [checkName]: false
    });
  };

  const isDateInvalid = () => {
    return value.toString() === "Invalid Date" || value.length === 0 || value === null;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={currentValue}
        onChange={handleNewValue}
        disabled={disabled}
        minDate={minDate && new Date(minDate)}
        maxDate={maxDate && new Date(maxDate)}
        renderInput={(params) => (
          <MDInput
            {...params}
            size="small"
            sx={{ width: "70%" }}
            error={!isFirst[checkName] && isDateInvalid()}
            helperText={
              !isFirst[checkName] && isDateInvalid() ? "Vui lòng nhập ngày thích hợp" : ""
            }
          />
        )}
        inputFormat="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}

BasicDatePicker.defaultProps = {
  type: null,
  minDate: null,
  maxDate: null,
  checkValid: {
    isFirst: {},
    setIsFirst: () => {},
    checkName: ""
  },
  disabled: false,
  setGroupStatus: null,
  status: ""
};

BasicDatePicker.propTypes = {
  value: PropTypes.instanceOf(Object).isRequired,
  event: PropTypes.func.isRequired,
  type: PropTypes.string,
  minDate: PropTypes.instanceOf(Object),
  maxDate: PropTypes.instanceOf(Object),
  checkValid: PropTypes.shape({
    isFirst: PropTypes.instanceOf(Object),
    setIsFirst: PropTypes.func,
    checkName: PropTypes.string
  }),
  disabled: PropTypes.bool,
  setGroupStatus: PropTypes.func,
  status: PropTypes.string
};

export default BasicDatePicker;
