/* eslint-disable no-unused-vars */
import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

import EditorToolbar from "./EditorToolbar";
import RichTextField from "./RichTextField";

function TextEditor({ channelId }) {
  return (
    <Box className="bg-white">
      <EditorToolbar channelId={channelId} />
      <RichTextField />
    </Box>
  );
}

TextEditor.propTypes = {
  channelId: PropTypes.string.isRequired
};

export default TextEditor;
