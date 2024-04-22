/* eslint-disable react/no-unstable-nested-components */
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";

import dayjs from "dayjs";

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
    const date = dayjs(newValue);

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={currentValue && currentValue.isValid() ? dayjs(currentValue) : null}
        onChange={handleNewValue}
        disabled={disabled}
        minDate={minDate && dayjs(minDate)}
        maxDate={maxDate && dayjs(maxDate)}
        textField={(params) => (
          <MDInput
            {...params}
            size="small"
            sx={{ width: "70%" }}
            error={!isFirst[checkName] && currentValue.isValid()}
            helperText={
              !isFirst[checkName] && currentValue.isValid() ? "Vui lòng nhập ngày thích hợp" : ""
            }
          />
        )}
        format="DD/MM/YYYY"
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
