/* eslint-disable no-unused-vars */
import React from "react";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { ClockIcon } from "assets/svgs";

function BookMeetingIconButton(props) {
  return (
    <IconButton>
      <ClockIcon width={30} height={30} />
    </IconButton>
  );
}

BookMeetingIconButton.propTypes = {};

export default BookMeetingIconButton;
