import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { convertToPlain } from "utils";

import TextMessagePopup from "./TextMessagePopup";

function TextMessage({ message }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Box className="w-[80%]">
      <Box onClick={() => setOpen(true)}>
        <Typography className="!text-xs !font-bold">Tin nhắn</Typography>
        <Typography className="!line-clamp-1 text-ellipsis !text-xs !text-[#7589A3] !max-w-[500px]">
          {message.sender.name}: {convertToPlain(message.content)}
        </Typography>
      </Box>
      <TextMessagePopup open={open} handleClose={handleClose} message={message} />
    </Box>
  );
}

TextMessage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired
};

export default TextMessage;
