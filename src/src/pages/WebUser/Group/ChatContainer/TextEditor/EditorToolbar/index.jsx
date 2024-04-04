/* eslint-disable no-unused-vars */
import { Box, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

import { useGetGroupDetail } from "hooks/groups/queries";
import { CHANNEL_PERMISSION } from "utils/constants";

import BookMeetingIconButton from "./BookMeetingIconButton";
import CreateTaskIconButton from "./CreateTaskIconButton";
import CreateVoteIconButton from "./CreateVoteIconButton";
import FileIconButton from "./FileIconButton";
import ImageIconButton from "./ImageIconButton";

function EditorToolbar({ channelId }) {
  const { data: channelInfo } = useGetGroupDetail(channelId);

  const hasPermission = (permission) => channelInfo && channelInfo.permissions.includes(permission);

  return (
    <Box className="h-[47px]" display="flex" alignItems="center">
      <ImageIconButton channelId={channelId} />
      {hasPermission(CHANNEL_PERMISSION.SEND_FILES) && <FileIconButton channelId={channelId} />}
      {hasPermission(CHANNEL_PERMISSION.MEETING_MANAGEMENT) && (
        <BookMeetingIconButton channelId={channelId} />
      )}
      {hasPermission(CHANNEL_PERMISSION.TASK_MANAGEMENT) && (
        <CreateTaskIconButton channelId={channelId} />
      )}
      {hasPermission(CHANNEL_PERMISSION.BOARD_MANAGEMENT) && (
        <CreateVoteIconButton channelId={channelId} />
      )}
    </Box>
  );
}

EditorToolbar.propTypes = {
  channelId: PropTypes.string.isRequired
};

export default EditorToolbar;
