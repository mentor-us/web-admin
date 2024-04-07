import PropTypes from "prop-types";

import { SendIconFocusSvg, SendIconUnfocusSvg } from "assets/svgs";

function SendIcon({ focused }) {
  if (focused) {
    return <SendIconFocusSvg />;
  }
  return <SendIconUnfocusSvg />;
}

SendIcon.propTypes = {
  focused: PropTypes.bool.isRequired
};

export default SendIcon;
