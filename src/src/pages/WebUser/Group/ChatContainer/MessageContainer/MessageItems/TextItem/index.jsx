/* eslint-disable react/forbid-prop-types */
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { Box, ListItemText, Typography } from "@mui/material";
import PropTypes from "prop-types";

import DOMPurify from "dompurify";

import MessageItemContainer from "../../MessageItemContainer";

function TextItem({ message, isOwner }) {
  return (
    <div className="flex flex-col">
      {message.isForward && (
        <div
          className={`flex flex-row  items-center ${
            isOwner ? "justify-end" : "justify-start pl-12"
          }`}
        >
          <ForwardToInboxIcon fontSize="small" />
          <span className={` text-xs ml-1 ${isOwner ? "text-right pr-4" : "text-left"}`}>
            {isOwner ? "Bạn" : message.sender.name} đã chuyển tiếp một tin nhắn
          </span>
        </div>
      )}
      <MessageItemContainer isOwner={isOwner} message={message}>
        {message?.reply && (
          <Box className="border-l-2 px-1 border-[#006EDC]">
            <Typography className="!text-xs font-bold text-[#006EDC]">
              {message.reply?.senderName}
            </Typography>
            <ListItemText
              primary={
                <div
                  className="text-xs text-nowrap !text-[#444] !line-clamp-5"
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
            <div
              className="text-sm text-nowrap"
              style={{
                display: "block",
                overflow: "hidden",
                whiteSpace: "initial",
                textOverflow: "ellipsis",
                wordBreak: "break-word"
              }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}
            />
          }
        />
      </MessageItemContainer>
    </div>
  );
}

TextItem.propTypes = {
  message: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired
};

export default TextItem;
