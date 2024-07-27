import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import "./styles.css";

function CustomCheckbox({ data, type, prop, action, isDisabled, isDisableRedux }) {
  const dispatch = useDispatch();
  const currentChecked = type && type === "single" ? data[prop] : data;

  const handleCheckedChange = () => {
    if (type && !isDisableRedux) {
      dispatch(action(data));
    } else if (isDisableRedux) {
      action(data);
    } else {
      action(!data);
    }
  };

  return (
    <input
      type="checkbox"
      className="checkbox"
      checked={currentChecked}
      onChange={handleCheckedChange}
      disabled={isDisabled}
    />
  );
}

CustomCheckbox.defaultProps = {
  type: false,
  prop: "is-checked",
  action: false,
  isDisabled: false,
  isDisableRedux: false
};

CustomCheckbox.propTypes = {
  data: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.bool]).isRequired,
  type: PropTypes.oneOfType([PropTypes.oneOf(["single", "all"]), PropTypes.bool]),
  prop: PropTypes.string,
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  isDisabled: PropTypes.bool,
  isDisableRedux: PropTypes.bool
};

export default CustomCheckbox;
