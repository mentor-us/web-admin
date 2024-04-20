import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { convertToPlain } from "utils";
import { CloseFillIcon } from "assets/svgs";

import useChatStore from "hooks/client/useChatStore";

function ReplyMessage({ message }) {
  const { clearReplyMessage } = useChatStore();

  return (
    <Box className="reply-message-container p-0">
      <Stack className="m-2 p-2 px-4 bg-[#eef0f1]" direction="row">
        <Box
          className="mr-2"
          sx={{
            alignSelf: "stretch",
            width: "2px",
            minWidth: "2px",
            background: "#3989ff",
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              height: "100%"
            }
          }}
        />
        <Box className="w-full">
          <Stack className="w-full" direction="row" justifyContent="space-between">
            <Stack direction="row">
              <FormatQuoteIcon />
              <Typography className="!text-[.8125rem]">
                Trả lời <strong>{message.sender.name}</strong>
              </Typography>
            </Stack>
            <Tooltip title="Đóng">
              <IconButton className="w-[20px] h-[20px] !p-0 " onClick={clearReplyMessage}>
                <CloseFillIcon className="hover:fill-red-500" />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography className="!line-clamp-1 !text-[.8125rem] !text-[#476285]">
            {convertToPlain(message.content)}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

ReplyMessage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired
};

export default ReplyMessage;
