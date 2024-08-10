/* eslint-disable react/forbid-prop-types */
// import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { Box, ListItemText, Typography } from "@mui/material";
import PropTypes from "prop-types";

import DOMPurify from "dompurify";

import MessageItemContainer from "../../MessageItemContainer";

function TextItem({ message, isOwner }) {
  return (
    <MessageItemContainer isOwner={isOwner} message={message}>
      {message?.reply && (
        <Box className="border-l-2 px-1 border-[#006EDC]">
          <Typography className="!text-xs font-bold text-[#006EDC]">
            {message.reply?.senderName}
          </Typography>
          <ListItemText
            primary={
              <div
                className="!text-lg text-nowrap !text-[#444] !line-clamp-5"
                style={{
                  display: "block",
                  overflow: "hidden",
                  whiteSpace: "initial",
                  textOverflow: "ellipsis",
                  wordBreak: "break-word"
                }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.reply?.content) }}
              />
            }
          />
        </Box>
      )}
      <ListItemText
        primary={
          message.content === "Tin nhắn đã được xóa" ? (
            <div
              className="text-lg text-nowrap"
              style={{
                display: "block",
                overflow: "hidden",
                whiteSpace: "initial",
                textOverflow: "ellipsis",
                fontStyle: "italic",
                color: "#999",
                wordBreak: "break-word"
              }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}
            />
          ) : (
            <div
              className="text-lg text-nowrap"
              style={{
                display: "block",
                overflow: "hidden",
                whiteSpace: "initial",
                textOverflow: "ellipsis",
                wordBreak: "break-word"
              }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}
            />
          )
        }
      />
    </MessageItemContainer>
  );
}

TextItem.propTypes = {
  message: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired
};

export default TextItem;
