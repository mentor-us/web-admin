import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { convertToPlain } from "utils";

import TextMessagePopup from "./TextMessagePopup";

function TextMessage({ message }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box onClick={() => setOpen(true)}>
        <Typography className="!text-xs !font-bold">Tin nhắn</Typography>
        <Typography className="!line-clamp-1 !text-xs !text-[#7589A3]">
          {message.sender.name}: {convertToPlain(message.content)}
        </Typography>
      </Box>
      <TextMessagePopup open={open} handleClose={handleClose} message={message} />
    </>
  );
}

TextMessage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired
};

export default TextMessage;
