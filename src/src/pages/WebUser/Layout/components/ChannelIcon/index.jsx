/* eslint-disable react/forbid-prop-types */
import { Avatar } from "@mui/material";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";
import { Hashtag, LockIcon } from "assets/svgs";

function ChannelIcon({ channel }) {
  if (channel.type === "PUBLIC") {
    return <Hashtag width={20} height={20} />;
  }

  if (channel.type === "PRIVATE") {
    return <LockIcon width={18} height={18} />;
  }

  return <Avatar src={getImageUrlWithKey(channel?.imageUrl)} className="!w-6 !h-6" />;
}

ChannelIcon.propTypes = {
  channel: PropTypes.object.isRequired
};

export default ChannelIcon;
