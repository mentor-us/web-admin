/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";

import { EMOJI_ICONS } from "utils/constants";

import ReactionBar from "../ReactionBar";

function ReactionButton({ className, message }) {
  if (!message?.totalReaction?.ownerReacted) {
    return null;
  }
  const {
    totalReaction: { ownerReacted }
  } = message;

  return (
    <div className={className}>
      <ReactionBar className="reaction-toolbar !min-w-64" message={message} />
      <img
        src={
          ownerReacted && ownerReacted.length > 0
            ? EMOJI_ICONS[ownerReacted[0].id]
            : EMOJI_ICONS.LIKE_INACTIVE
        }
        alt="icon"
      />
    </div>
  );
}

ReactionButton.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object.isRequired
};

ReactionButton.defaultProps = {
  className: ""
};

export default ReactionButton;
