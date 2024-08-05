import { forwardRef } from "react";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import MDInputRoot from "components/MDComponents/MDInput/MDInputRoot";

const MDInput = forwardRef(({ error, success, maxLength, disabled, ...rest }, ref) => (
  <MDInputRoot
    {...rest}
    ref={ref}
    ownerState={{ error, success, disabled }}
    inputProps={{ maxLength }}
  />
));

// Setting default values for the props of MDInput
MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
  maxLength: 255
};

// Typechecking props for the MDInput
MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number
};

export default MDInput;
