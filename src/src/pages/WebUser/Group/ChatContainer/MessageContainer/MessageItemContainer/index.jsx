/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import { useState } from "react";
import { useParams } from "react-router-dom";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Box, ListItem, ListItemAvatar, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { getTime } from "utils";

import AsyncMDAvatar from "pages/WebUser/components/AsyncMDAvatar";
import ReactedEmoji from "pages/WebUser/components/ReactedEmoji";
import ReactionButton from "pages/WebUser/components/ReactionButton";
import { useGetGroupDetail } from "hooks/groups/queries";

import FloatingOptions from "../FloatingOptions";

const styles = {
  container: {
    backgroundColor: "#fff",
    borderRadius: "0.4rem",
    padding: "0.4rem 0.4rem",
    borderWidth: 0.5,
    color: "#333"
  },
  ownerContainer: {
    borderRadius: "0.4rem 0 0.4rem 0.4rem",
    borderColor: "#2F88FF"
  },
  otherContainer: {
    borderRadius: "0 0.4rem 0.4rem 0.4rem",
    borderColor: "#ccc"
  }
};

function MessageItemContainer({ children, message, isOwner }) {
  const { channelId } = useParams();
  const { data: channelDetail } = useGetGroupDetail(channelId);
  const [isShowFloatOpts, setIsShowFloatOpts] = useState(false);

  const containerStyle = isOwner
    ? {
        ...styles.container,
        ...styles.ownerContainer
      }
    : {
        ...styles.container,
        ...styles.otherContainer
      };

  const renderMessageSubHeader = () => {
    let content = "";

    if (channelDetail?.pinnedMessageIds.includes(message.id)) {
      content = (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.2}>
          <PushPinIcon />
          <span>Tin nhắn đã được ghim</span>
        </Stack>
      );
    }

    return <div className={`text-sm mb-1 ${!isOwner ? "ml-[32px]" : ""}`}>{content}</div>;
  };

  return (
    <Box
      className={`message-item-container flex space-x-2 items-start px-2 ${
        isOwner ? "justify-end" : "justify-start other-message-container"
      }`}
      onMouseEnter={() => setIsShowFloatOpts(true)}
      onMouseLeave={() => setIsShowFloatOpts(false)}
    >
      <ListItem className={`max-w-[70%] ${isOwner ? "!justify-end" : ""}`}>
        <Stack direction="column" alignItems={isOwner ? "flex-end" : "flex-start"}>
          {renderMessageSubHeader()}
          <Stack
            className={`${isOwner ? "justify-start" : ""}`}
            direction={isOwner ? "row-reverse" : "row"}
          >
            {!isOwner && (
              <ListItemAvatar sx={{ alignSelf: "start", marginRight: "0.5rem", minWidth: 0 }}>
                <AsyncMDAvatar
                  sx={{
                    width: "32px",
                    height: "32px",
                    marginRight: 0,
                    padding: 0
                  }}
                  src={message?.sender?.imageUrl}
                />
              </ListItemAvatar>
            )}
            <div className="message-item-content h-full space-y-1" style={containerStyle}>
              {!isOwner && (
                <Typography className="!text-xs font-bold text-[#299C49]">
                  {message?.sender?.name}
                </Typography>
              )}
              {children}
              <Typography
                className="!text-sm !mb-2"
                style={{
                  color: "#888"
                }}
              >
                {getTime(message?.createdDate)}
              </Typography>
              <Stack className="reaction-button-container" spacing={1} direction="row">
                <ReactedEmoji
                  className="reacted-emoji-container"
                  reactions={message?.reactions}
                  totalReaction={message?.totalReaction}
                />
                <ReactionButton
                  className={`reaction-icon-button ${
                    message?.totalReaction?.ownerReacted.length !== 0 ? "flex" : "hidden"
                  }`}
                  message={message}
                />
              </Stack>
            </div>
            <FloatingOptions message={message} isShow={isShowFloatOpts} />
          </Stack>
        </Stack>
      </ListItem>
    </Box>
  );
}

MessageItemContainer.propTypes = {
  children: PropTypes.node.isRequired,
  message: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired
};

export default MessageItemContainer;
