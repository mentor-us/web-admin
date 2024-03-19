/* eslint-disable no-unused-vars */
import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

function TextEditor(props) {
  return (
    <Box className="bg-white">
      <Box className="h-[47px]" display="flex" alignItems="center">
        Toolbar
      </Box>
      <Box className="h-[58px]">Chat</Box>
    </Box>
  );
}

TextEditor.propTypes = {};

export default TextEditor;
