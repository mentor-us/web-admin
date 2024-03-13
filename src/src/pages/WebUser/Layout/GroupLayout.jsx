/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink, Outlet } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import StarBorder from "@mui/icons-material/StarBorder";
import { Button, IconButton, Tooltip } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Zoom from "@mui/material/Zoom";
import PropTypes from "prop-types";

import { GroupIcon, Hashtag, LockIcon, ParagraphIcon, UserNameIcon } from "assets/svgs";

import { useGetWorkSpace } from "hooks/groups/queries";
import { USER_ROLE } from "utils/constants";

import GroupHeader from "../Group/GroupHeader";

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

function ChannelItem({ channel, role, selectedChannelId, onChannelSelected }) {
  const navigate = useNavigate();
  if (!channel) {
    return null;
  }

  return (
    <ListItemButton
      sx={{ pl: 4 }}
      onClick={() => {
        navigate(`channel/${channel?.id}`);
        onChannelSelected(channel?.id);
      }}
      selected={selectedChannelId === channel?.id}
    >
      <ListItemIcon>
        <ChannelIcon channel={channel} />
      </ListItemIcon>
      <Tooltip title={channel.name} arrow placement="right" TransitionComponent={Zoom}>
        <ListItemText disableTypography className="text-base line-clamp-1" primary={channel.name} />
      </Tooltip>
    </ListItemButton>
  );
}

ChannelItem.propTypes = {
  channel: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  selectedChannelId: PropTypes.string,
  onChannelSelected: PropTypes.func.isRequired
};

ChannelItem.defaultProps = {
  selectedChannelId: ""
};

export default function GroupLayout() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { data: workspace, isLoading, isSuccess } = useGetWorkSpace(groupId);
  const [selectedChannelId, setSelectedChannelId] = React.useState("");
  console.log(workspace);
  const handleListItemClick = (channelId) => {
    setSelectedChannelId(channelId);
  };

  const [showChannelList, setShowChannelList] = useState(true);
  const [showPersonalChannelList, setShowPersonalChannelList] = useState(true);

  useEffect(() => {
    setSelectedChannelId(workspace?.defaultChannelId);
  }, [workspace]);

  const toggleChannelList = () => {
    setShowChannelList((pre) => !pre);
  };

  const toggleShowPersonalChannel = () => {
    setShowPersonalChannelList((pre) => !pre);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col w-80 h-full bg-white border-r-[2px]">
        <div className="h-16 bg-white ">
          {isSuccess && <GroupHeader groupName={workspace?.name} />}
        </div>
        <hr />
        <div className="flex flex-col mt-1">
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="channel-list-subheader"
          >
            <ListItemButton
              onClick={() => {
                navigate(`channel/${workspace?.defaultChannelId}`);
                handleListItemClick(workspace?.defaultChannelId);
              }}
              selected={selectedChannelId === workspace?.defaultChannelId}
            >
              <ListItemIcon>
                <GroupIcon width={22} height={22} />
              </ListItemIcon>
              <Tooltip
                title="Cuộc trò chuyện chung"
                arrow
                placement="right"
                TransitionComponent={Zoom}
              >
                <ListItemText
                  className="text-base"
                  disableTypography
                  primary="Cuộc trò chuyện chung"
                />
              </Tooltip>
            </ListItemButton>
            <Divider
              sx={{
                margin: 1,
                padding: 0,
                backgroundColor: "#ccc"
              }}
            />
            <ListItemButton onClick={toggleChannelList}>
              <ListItemIcon>
                <ParagraphIcon width={22} height={22} />
              </ListItemIcon>
              <ListItemText disableTypography className="text-base" primary="Kênh" />

              {workspace?.role === USER_ROLE.MENTOR && (
                <IconButton
                  aria-label="create-channel"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <AddIcon />
                </IconButton>
              )}
              {showChannelList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={showChannelList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {workspace?.channels.map((channel) => {
                  return (
                    <ChannelItem
                      key={channel.id}
                      channel={channel}
                      selectedChannelId={selectedChannelId}
                      onChannelSelected={handleListItemClick}
                      role={workspace?.role || "MENTEE"}
                    />
                  );
                })}
              </List>
            </Collapse>
            <Divider
              sx={{
                margin: 1,
                padding: 0,
                backgroundColor: "#ccc"
              }}
            />
            <ListItemButton onClick={toggleShowPersonalChannel}>
              <ListItemIcon>
                <UserNameIcon width={22} height={22} />
              </ListItemIcon>
              <ListItemText className="text-base" disableTypography primary="Tin nhắn riêng" />
              {showPersonalChannelList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={showPersonalChannelList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {workspace?.privates.map((channel) => {
                  return (
                    <ChannelItem
                      key={channel.id}
                      channel={channel}
                      selectedChannelId={selectedChannelId}
                      onChannelSelected={handleListItemClick}
                      role={workspace?.role || "MENTEE"}
                    />
                  );
                })}
              </List>
            </Collapse>
          </List>
        </div>
      </div>
    </div>
  );
}
