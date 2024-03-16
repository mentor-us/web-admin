/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";

import MessageItemContainer from "../../MessageItemContainer";

function FileItem({ message, isOwner }) {
  return (
    <MessageItemContainer isOwner={isOwner} message={message}>
      File
    </MessageItemContainer>
  );
}

FileItem.propTypes = {
  message: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired
};

export default FileItem;
