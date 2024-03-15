/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";

import { Hashtag, LockIcon } from "assets/svgs";

function ChannelIcon({ channel }) {
  if (channel.type === "PUBLIC") {
    return <Hashtag width={20} height={20} />;
  }

  if (channel.type === "PRIVATE") {
    return <LockIcon width={18} height={18} />;
  }

  // return (
  //   <image
  //     style={styles.avatar}
  //     source={
  //       channel.imageUrl ? { uri: channel.imageUrl } : DefaultUserAvatar
  //     }
  //   />
  // );
}

ChannelIcon.propTypes = {
  channel: PropTypes.object.isRequired
};

export default ChannelIcon;
