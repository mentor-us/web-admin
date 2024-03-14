import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { CalendarIcon, GroupIcon, Hashtag, MediaIcon } from "assets/svgs";

import MDAvatar from "components/MDComponents/MDAvatar";
// Define the group information
const groupInfoExample = {
  name: "Nguyen van hau",
  avatar: "https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg",
  tools: "haha"
};
// eslint-disable-next-line react/prop-types, no-shadow
function ChannelItem({ type }) {
  // eslint-disable-next-line react/prop-types
  switch (type) {
    case "member":
      return (
        <ListItemButton>
          <ListItemIcon>
            <GroupIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            className="text-base line-clamp-1"
            primary="Thành viên nhóm"
          />
        </ListItemButton>
      );
    case "utility":
      return (
        <>
          <ListItemButton>
            <ListItemIcon>
              <CalendarIcon width={20} height={20} />
            </ListItemIcon>
            <ListItemText disableTypography className="text-base line-clamp-1" primary="Lịch hẹn" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Hashtag width={20} height={20} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              className="text-base line-clamp-1"
              primary="Bình chọn"
            />
          </ListItemButton>
        </>
      );
    case "media":
      return (
        <>
          <ListItemButton>
            <ListItemIcon>
              <MediaIcon width={20} height={20} />
            </ListItemIcon>
            <ListItemText disableTypography className="text-base line-clamp-1" primary="Hình ảnh" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <MediaIcon width={20} height={20} />
            </ListItemIcon>
            <ListItemText disableTypography className="text-base line-clamp-1" primary="Hình ảnh" />
          </ListItemButton>
        </>
      );
    default:
      return null;
  }
}

export default function GroupInfo() {
  const [ShowGroupMember, setShowGroupMember] = useState(true);
  const toggleChannelList = () => {
    setShowGroupMember((pre) => !pre);
  };
  return (
    <div className="flex flex-col w-80 h-full bg-white border-r-[2px]">
      <div className="w-full font-bold text-base border-white flex justify-center items-center space-x-4 p-4">
        Thông tin hội thoại
      </div>
      <hr />
      <div className="overflow-auto">
        <div className="header-info p-3">
          <div className="header-info ava flex justify-center items-center space-x-4 p-4 ">
            <MDAvatar
              src={groupInfoExample.avatar}
              alt="detail-image"
              shadow="md"
              size="md"
              sx={{
                alignSelf: "center",
                background: "white",
                mx: 0,
                border: "1px solid white",
                "border-radius": "34px"
              }}
            />
          </div>
          <div className="header-info name w-full font-bold text-base border-white flex justify-center items-center p-1">
            {groupInfoExample.name}
            <IconButton size="small">
              <EditOutlinedIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="header-info flex justify-center gap-8 text-xs items-center tools ">
            <div>
              <div className="tool-item bg-gray-100 hover:bg-slate-300 rounded-full">
                <IconButton size="small" color="black">
                  <SettingsOutlinedIcon />
                </IconButton>
              </div>
            </div>
            <div className="tool-item bg-gray-100 hover:bg-slate-300 rounded-full">
              <IconButton size="small" color="black">
                <NotificationsOutlinedIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <Divider
          sx={{
            margin: 1,
            padding: 0,
            backgroundColor: "#ccc"
          }}
        />
        <ListItemButton onClick={toggleChannelList}>
          <ListItemText
            disableTypography
            className="text-base font-bold"
            primary="Thành viên nhóm"
          />

          {ShowGroupMember ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={ShowGroupMember} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ChannelItem type="member" />
          </List>
        </Collapse>
        <Divider
          sx={{
            margin: 1,
            padding: 0,
            backgroundColor: "#ccc"
          }}
        />
        <ListItemButton onClick={toggleChannelList}>
          <ListItemText disableTypography className="text-base font-bold" primary="Bảng tin" />

          {ShowGroupMember ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={ShowGroupMember} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ChannelItem type="utility" />
          </List>
        </Collapse>
        <Divider
          sx={{
            margin: 1,
            padding: 0,
            backgroundColor: "#ccc"
          }}
        />
        <ListItemButton onClick={toggleChannelList}>
          <ListItemText
            disableTypography
            className="text-base font-bold"
            primary="Bộ sưu tập, tập tin đã gửi"
          />

          {ShowGroupMember ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={ShowGroupMember} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ChannelItem type="media" />
          </List>
        </Collapse>
      </div>
    </div>
  );
}
