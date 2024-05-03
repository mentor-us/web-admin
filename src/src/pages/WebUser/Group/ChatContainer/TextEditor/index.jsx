/* eslint-disable no-unused-vars */
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { CloseFillIcon } from "assets/svgs";

import useChatStore from "hooks/client/useChatStore";

import EditorToolbar from "./EditorToolbar";
import RichTextField from "./RichTextField";

function TextEditor({ channelId }) {
  const chatStore = useChatStore();
  return (
    <Box className="bg-white">
      {chatStore.isEditMessage ? (
        <Stack
          className="p-2 px-4"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className="!text-[.8125rem] !font-bold !align-middle">
            Chỉnh sửa tin nhắn
          </Typography>
          <Tooltip title="Đóng">
            <IconButton className="w-[20px] h-[20px] !p-0 " onClick={chatStore.clearEditMessage}>
              <CloseFillIcon className="hover:fill-red-500" />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <EditorToolbar channelId={channelId} />
      )}

      <RichTextField />
    </Box>
  );
}

TextEditor.propTypes = {
  channelId: PropTypes.string.isRequired
};

export default TextEditor;
