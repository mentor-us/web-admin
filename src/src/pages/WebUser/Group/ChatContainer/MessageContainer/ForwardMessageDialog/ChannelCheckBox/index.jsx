import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Avatar, Checkbox, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";

function ChannelCheckBox({ channel, listChannelForward, toggleChoseChannel }) {
  const handleClick = () => {
    toggleChoseChannel(channel.id);
  };
  // onClick={() => toggleChoseChannel(channel.id)}
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="flex justify-between items-center cursor-pointer text-sm align-center w-full hover:bg-slate-200 pt-2 pb-2 gap-x-2 rounded"
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <Checkbox
        checked={listChannelForward.includes(channel.id)}
        icon={<CheckCircleOutlineIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <div className="flex flex-row gap-x-4 w-full items-center">
        <Avatar
          alt="chat-avatar"
          className="!w-10 !h-10"
          src={getImageUrlWithKey(channel?.group?.imageUrl)}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "left"
          }}
        >
          <Typography fontSize="medium" align="bottom">
            {channel.name}
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Typography fontSize="medium" align="bottom" className="truncate max-w-24">
          {channel?.group?.name ?? ""}
        </Typography>
      </div>
    </div>
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
