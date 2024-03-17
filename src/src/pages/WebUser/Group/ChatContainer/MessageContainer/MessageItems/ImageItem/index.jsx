/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";

import GridImage from "pages/WebUser/components/GridImage";

import MessageItemContainer from "../../MessageItemContainer";

function ImageItem({ message, isOwner }) {
  return (
    <MessageItemContainer isOwner={isOwner} message={message}>
      <GridImage images={message?.images} galleryID={`images-${message?.id}`} />
    </MessageItemContainer>
  );
}

ImageItem.propTypes = {
  message: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired
};

export default ImageItem;
