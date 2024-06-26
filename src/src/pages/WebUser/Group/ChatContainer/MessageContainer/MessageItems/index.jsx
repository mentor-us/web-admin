/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/forbid-prop-types */
import { Box } from "@mui/material";
import PropTypes from "prop-types";

import { MESSAGE_STATUS, MESSAGE_TYPE } from "utils/constants";

// eslint-disable-next-line import/no-cycle
import FileItem from "./FileItem";
// eslint-disable-next-line import/no-cycle
import ImageItem from "./ImageItem";
import MeetingItem from "./MeetingItem";
import TaskItem from "./TaskItem";
// eslint-disable-next-line import/no-cycle
import TextItem from "./TextItem";
import VoteItem from "./VoteItem";
import "./styles.css";

function MessageItems({ message, isOwner }) {
  function Content() {
    if (message.status === MESSAGE_STATUS.DELETED) {
      return (
        <TextItem
          message={{
            ...message,
            content: "Tin nhắn đã được xóa"
          }}
          isOwner={isOwner}
        />
      );
    }
    switch (message.type) {
      case MESSAGE_TYPE.TEXT:
        return <TextItem message={message} isOwner={isOwner} />;
      case MESSAGE_TYPE.IMAGE:
        return <ImageItem message={message} isOwner={isOwner} />;
      case MESSAGE_TYPE.VOTE:
        return <VoteItem message={message} />;
      case MESSAGE_TYPE.FILE:
        return <FileItem message={message} isOwner={isOwner} />;
      case MESSAGE_TYPE.MEETING:
        return <MeetingItem meeting={message?.meeting} />;
      case MESSAGE_TYPE.TASK:
        return <TaskItem task={message?.task} />;
      default:
        return <TextItem message={message} isOwner={isOwner} />;
    }
  }

  return (
    <Box>
      <Content />
    </Box>
  );
}

MessageItems.propTypes = {
  message: PropTypes.object.isRequired,
  isOwner: PropTypes.bool
};

MessageItems.defaultProps = {
  isOwner: false
};

export default MessageItems;
