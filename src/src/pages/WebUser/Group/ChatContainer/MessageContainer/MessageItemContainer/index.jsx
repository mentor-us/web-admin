/* eslint-disable react/forbid-prop-types */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, ListItem, ListItemAvatar, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { getTime } from "utils";
import { PinIconMessenger } from "assets/svgs";

import AsyncMDAvatar from "pages/WebUser/components/AsyncMDAvatar";
import ProfileDialog from "pages/WebUser/components/ProfileDialog";
import ReactedEmoji from "pages/WebUser/components/ReactedEmoji";
import ReactionButton from "pages/WebUser/components/ReactionButton";
import { useGetGroupDetail } from "hooks/groups/queries";
import { MESSAGE_STATUS } from "utils/constants";

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
  const [openProfile, setOpenProfile] = useState(false);
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
    const content = [];

    if (channelDetail?.pinnedMessageIds.includes(message.id)) {
      content.push("Đã ghim");
    }

    if (message?.status === MESSAGE_STATUS.EDITED) {
      content.push("Đã chỉnh sửa");
    }

    return (
      <div className={`text-sm mb-1 ${!isOwner ? "ml-10" : ""}`}>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.2}>
          <span>{content.join(" · ")}</span>
        </Stack>
      </div>
    );
  };
  const handleProfileOpen = () => {
    setOpenProfile(true);
    console.log("message sender: ", message?.sender);
  };

  const handleProfileClose = () => {
    setOpenProfile(false);
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
                  onClick={handleProfileOpen}
                />
                {openProfile && (
                  <ProfileDialog
                    open={openProfile}
                    onClose={handleProfileClose}
                    user={message?.sender}
                  />
                )}
              </ListItemAvatar>
            )}
            <div className="message-item-content h-full space-y-1" style={containerStyle}>
              {channelDetail?.pinnedMessageIds.includes(message.id) && (
                <PinIconMessenger className="absolute right-0 top-0 translate-x-[50%] translate-y-[-50%] transform scale-x-[-1] scale-y-[1]" />
              )}
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
              {message.status !== MESSAGE_STATUS.DELETED && (
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
              )}
            </div>
            {message.status !== MESSAGE_STATUS.DELETED && (
              <FloatingOptions message={message} isShow={isShowFloatOpts} />
            )}
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
