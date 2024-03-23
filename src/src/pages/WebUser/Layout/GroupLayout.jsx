/* eslint-disable react/jsx-no-useless-fragment */
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
import { Box, Button, IconButton, Skeleton, Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
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
import GroupInfo from "../Group/GroupInfo";

// import MessageContainer from "../Group/MessageContainer";
import ChannelItem, { styleActiveChannel } from "./components/ChannelItem";
import ChannelSkeleton from "./components/ChannelSkeleton";
import CreateNewChannelDialog from "./components/CreateNewChannelDialog";

export default function GroupLayout() {
  const [showLayout, setShowLayout] = useState(true);
  const toggleGroupDetail = () => {
    setShowLayout((pre) => !pre);
  };

  const navigate = useNavigate();
  const { groupId, channelId } = useParams();
  const { data: workspace, isLoading, isSuccess } = useGetWorkSpace(groupId);
  const [selectedChannelId, setSelectedChannelId] = React.useState("");

  const handleListItemClick = (id) => {
    setSelectedChannelId(id);
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

  const [openCreateChannelDialog, setOpenCreateChannelDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenCreateChannelDialog(true);
  };

  const handleClose = () => {
    setOpenCreateChannelDialog(false);
  };

  const isHasChannels = workspace?.channels?.length !== 1;
  const isHasPersonalChannels = workspace?.privates?.length !== 0;

  useEffect(() => {
    if (isHasChannels) {
      setShowChannelList(true);
    }
    if (isHasPersonalChannels) {
      setShowPersonalChannelList(true);
    }
  }, [isHasChannels, isHasPersonalChannels]);

  return (
    <>
      <div className="flex w-full h-full">
        <div className="flex flex-col min-w-80 w-80 h-full bg-white border-r-[2px]">
          <div className="h-16 bg-white ">
            {isSuccess && <GroupHeader groupName={workspace?.name} isLoading={isLoading} />}
          </div>
          <hr />
          <div className="flex flex-col mt-1">
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="channel-list-subheader"
            >
              <Tooltip
                title="Cuộc trò chuyện chung"
                arrow
                placement="right"
                TransitionComponent={Zoom}
              >
                <ListItemButton
                  onClick={() => {
                    navigate(`channel/${workspace?.defaultChannelId}`);
                    handleListItemClick(workspace?.defaultChannelId);
                  }}
                  selected={selectedChannelId === workspace?.defaultChannelId}
                  sx={styleActiveChannel(selectedChannelId === workspace?.defaultChannelId)}
                >
                  <ListItemIcon>
                    <GroupIcon width={22} height={22} />
                  </ListItemIcon>

                  <ListItemText
                    className="text-base"
                    disableTypography
                    primary="Cuộc trò chuyện chung"
                  />
                </ListItemButton>
              </Tooltip>
              <Divider
                sx={{
                  margin: 1,
                  padding: 0,
                  backgroundColor: "#ccc"
                }}
              />
              <ListItemButton
                onClick={isHasChannels ? toggleChannelList : null}
                disableTouchRipple={!isHasChannels}
              >
                <ListItemIcon>
                  <ParagraphIcon width={22} height={22} />
                </ListItemIcon>
                <ListItemText disableTypography className="text-base" primary="Kênh" />

                {workspace?.role === USER_ROLE.MENTOR && (
                  <Tooltip title="Tạo kênh mới">
                    <IconButton
                      aria-label="create-channel"
                      size="small"
                      sx={{
                        "&:hover": {
                          backgroundColor: "grey.400"
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickOpen();
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {isHasChannels && <>{showChannelList ? <ExpandLess /> : <ExpandMore />}</>}
              </ListItemButton>
              <Collapse in={showChannelList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {isLoading && (
                    <>
                      {[1, 2, 3].map((val) => {
                        return (
                          <ListItemButton key={val} disableTouchRipple>
                            <ListItemIcon />
                            <ChannelSkeleton />
                          </ListItemButton>
                        );
                      })}
                    </>
                  )}
                  {!isHasChannels ? (
                    <ListItemButton disableRipple disableTouchRipple disabled>
                      <ListItemIcon />
                      <ListItemText
                        disableTypography
                        className="text-base line-clamp-1"
                        primary="Chưa có kênh nào"
                      />
                    </ListItemButton>
                  ) : (
                    <>
                      {workspace?.channels.map((channel) => {
                        if (channel && channel.id !== workspace?.defaultChannelId) {
                          return (
                            <ChannelItem
                              key={channel.id}
                              channel={channel}
                              selectedChannelId={selectedChannelId}
                              onChannelSelected={handleListItemClick}
                              role={workspace?.role || "MENTEE"}
                            />
                          );
                        }
                        return null;
                      })}
                    </>
                  )}
                </List>
              </Collapse>
              <Divider
                sx={{
                  margin: 1,
                  padding: 0,
                  backgroundColor: "#ccc"
                }}
              />
              <ListItemButton
                onClick={isHasPersonalChannels ? toggleShowPersonalChannel : null}
                disableTouchRipple={!isHasPersonalChannels}
              >
                <ListItemIcon>
                  <UserNameIcon width={22} height={22} />
                </ListItemIcon>
                <ListItemText className="text-base" disableTypography primary="Tin nhắn riêng" />
                {isHasPersonalChannels && (
                  <> {showPersonalChannelList ? <ExpandLess /> : <ExpandMore />}</>
                )}
              </ListItemButton>
              <Collapse in={showPersonalChannelList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {isLoading && (
                    <>
                      {[1, 2, 3].map((val, index) => {
                        return (
                          <ListItemButton key={val} disableTouchRipple>
                            <ListItemIcon />
                            <ChannelSkeleton />
                          </ListItemButton>
                        );
                      })}
                    </>
                  )}
                  {!isHasPersonalChannels ? (
                    <ListItemButton disableRipple disableTouchRipple disabled>
                      <ListItemIcon />
                      <ListItemText
                        disableTypography
                        className="text-base line-clamp-1"
                        primary="Chưa có cuộc trò chuyện nào"
                      />
                    </ListItemButton>
                  ) : (
                    <>
                      {workspace?.privates.map((channel) => {
                        return (
                          <ChannelItem
                            disableContextMenu
                            key={channel.id}
                            channel={channel}
                            selectedChannelId={selectedChannelId}
                            onChannelSelected={handleListItemClick}
                            role={workspace?.role || "MENTEE"}
                          />
                        );
                      })}
                    </>
                  )}
                </List>
              </Collapse>
            </List>
          </div>
        </div>
        <div className="h-full w-full">
          <Outlet context={[showLayout, toggleGroupDetail]} />
        </div>
        {channelId && showLayout && (
          <div className="min-w-78 w-78 h-full bg-slate-100 border-l-2">
            <GroupInfo />
          </div>
        )}
      </div>
      {openCreateChannelDialog && (
        <CreateNewChannelDialog open={openCreateChannelDialog} handleClose={handleClose} />
      )}
    </>
  );
}
