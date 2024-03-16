/* eslint-disable react/forbid-prop-types */
import React from "react";
import { ListItemText } from "@mui/material";
import PropTypes from "prop-types";

import DOMPurify from "dompurify";

import MessageItemContainer from "../../MessageItemContainer";

function TextItem({ message, isOwner }) {
  return (
    <MessageItemContainer isOwner={isOwner} message={message}>
      <ListItemText
        primary={
          <div
            className="text-sm text-nowrap"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}
          />
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
