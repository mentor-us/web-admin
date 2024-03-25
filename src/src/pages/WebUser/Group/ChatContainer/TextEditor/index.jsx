/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import socket from "socket.io-client/lib/socket";

import useMyInfo from "hooks/useMyInfo";

import EditorToolbar from "./EditorToolbar";
import RichTextField from "./RichTextField";

function TextEditor({ channelId }) {
  const myInfo = useMyInfo();

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
