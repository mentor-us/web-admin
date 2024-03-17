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
        return <FileItem message={message} isOwner={isOwner} />;
      default:
        return null;
    }
  }

  return (
    <div className="flex space-x-2 justify-start items-start px-2 pb-2 max-w-[70%]">
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
