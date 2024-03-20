/* eslint-disable no-unused-vars */
import React from "react";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { AttachmentIcon, MediaIcon } from "assets/svgs";

function FileIconButton(props) {
  return (
    <IconButton>
      <AttachmentIcon width={30} height={30} />
    </IconButton>
  );
}

FileIconButton.propTypes = {};

export default FileIconButton;
