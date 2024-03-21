/* eslint-disable react/forbid-prop-types */
import { Box, ListItem, ListItemAvatar, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { getTime } from "utils";

import AsyncMDAvatar from "pages/WebUser/components/AsyncMDAvatar";

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
  const containerStyle = isOwner
    ? {
        ...styles.container,
        ...styles.ownerContainer
      }
    : {
        ...styles.container,
        ...styles.otherContainer
      };

  return (
    <Box
      className={`flex space-x-2 items-start px-2 ${isOwner ? " justify-end" : "justify-start"}`}
    >
      <ListItem className={`max-w-[70%] ${isOwner ? "!justify-end" : ""}`}>
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
        <div className="h-full space-y-1" style={containerStyle}>
          {!isOwner && (
            <Typography className="!text-xs font-bold text-[#299C49]">
              {message?.sender?.name}
            </Typography>
          )}
          {children}
          <Typography
            className="!text-sm"
            style={{
              color: "#888"
            }}
          >
            {getTime(message?.createdDate)}
          </Typography>
        </div>
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
