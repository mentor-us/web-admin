import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Avatar, Button, Checkbox, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";

function ChannelCheckBox({ channel, listChannelForward, toggleChoseChannel }) {
  console.log(channel, listChannelForward);

  return (
    <Button
      className="flex justify-between align-middle align-center w-full"
      onClick={() => toggleChoseChannel(channel.id)}
      sx={{
        "&:hover": {
          backgroundColor: "rgb(226 232 240);" // Change to the desired hover background color
        }
      }}
    >
      <div className="flex flex-row gap-x-4 w-full align-middle">
        <Avatar
          alt="chat-avatar"
          className="!w-10 !h-10"
          src={getImageUrlWithKey(channel?.group?.imageUrl)}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <Typography align="bottom">{channel.name}</Typography>
        </div>
      </div>
      <Checkbox
        checked={listChannelForward.includes(channel.id)}
        icon={<CheckCircleOutlineIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
    </Button>
  );
}
ChannelCheckBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  channel: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  listChannelForward: PropTypes.array.isRequired,
  toggleChoseChannel: PropTypes.func.isRequired
};
export default ChannelCheckBox;
