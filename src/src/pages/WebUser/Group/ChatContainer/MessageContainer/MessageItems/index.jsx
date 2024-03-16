/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";

import { MESSAGE_TYPE } from "utils/constants";

import FileItem from "./FileItem";
import ImageItem from "./ImageItem";
import TextItem from "./TextItem";
import VoteItem from "./VoteItem";

function MessageItems({ message, isOwner }) {
  function Content() {
    switch (message.type) {
      case MESSAGE_TYPE.TEXT:
        return <TextItem message={message} isOwner={isOwner} />;
      case MESSAGE_TYPE.IMAGE:
        return <ImageItem message />;
      case MESSAGE_TYPE.VOTE:
        return <VoteItem message />;
      case MESSAGE_TYPE.FILE:
        return <FileItem />;
      default:
        return null;
    }
  }

  return (
    <div
      style={{
        maxWidth: "70%",
        width: "70%",
        marginBottom: 5
      }}
      className="flex space-x-2 mx-2 justify-start items-start"
    >
      <Content />
    </div>
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
