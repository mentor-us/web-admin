/* eslint-disable react/forbid-prop-types */
import { ListItem, ListItemAvatar, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { getTime } from "utils";

import AsyncMDAvatar from "pages/WebUser/components/AsyncMDAvatar";

const styles = {
  container: {
    backgroundColor: "#fff",
    borderRadius: "0.4rem",
    padding: "0.4rem 0.4rem",
    borderWidth: 0.5,
    color: "#333",
    borderColor: "#2F88FF"
  },
  ownerContainer: {
    borderRadius: "0.4rem 0 0.4rem 0.4rem"
  },
  otherContainer: {
    borderRadius: "0 0.4rem 0.4rem 0.4rem"
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
    <ListItem>
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
      <div className="w-full h-full space-y-1" style={containerStyle}>
        <Typography className="!text-xs font-bold text-[#299C49]">
          {message?.sender?.name}
        </Typography>
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
  );
}

MessageItemContainer.propTypes = {
  children: PropTypes.node.isRequired,
  message: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired
};

export default MessageItemContainer;
