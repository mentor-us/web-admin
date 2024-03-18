import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from "react-router";
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
import ListItemText from "@mui/material/ListItemText";

import AsyncMDAvatar from "pages/WebUser/components/AsyncMDAvatar";
import GroupInfoItem from "pages/WebUser/Group/GroupInfo/GroupFunction";
import { useGetGroupDetail } from "hooks/groups/queries";
// Define the group information

// eslint-disable-next-line react/prop-types, no-shadow

export default function GroupInfo() {
  const [ShowGroupMember, setShowGroupMember] = useState(true);
  const [ShowGroupUtility, setShowGroupUtility] = useState(true);
  const [ShowGroupMedia, setShowGroupMedia] = useState(true);
  const toggleMemberList = () => {
    setShowGroupMember((pre) => !pre);
  };
  const toggleChannelUtility = () => {
    setShowGroupUtility((pre) => !pre);
  };
  const toggleChannelMedia = () => {
    setShowGroupMedia((pre) => !pre);
  };

  // const navigate = useNavigate();
  const { channelId } = useParams();
  const {
    data: groupDetail,
    isLoading,
    isSuccess
  } = useGetGroupDetail(channelId === "null" ? null : channelId);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    console.log(groupDetail);
  }, [groupDetail, isLoading]);

  if (isLoading) {
    return null;
  }

  if (!channelId) {
    return null;
  }

  return (
    <div className="flex flex-col w-80 h-full bg-white border-r-[2px]">
      <div className="w-full font-bold text-base border-white flex justify-center items-center space-x-4 p-4">
        Thông tin hội thoại
      </div>
      <hr />
      <div className="overflow-auto">
        <div className="header-info p-3">
          <div className="header-info ava flex justify-center items-center space-x-4 p-4 ">
            <AsyncMDAvatar
              src={groupDetail?.imageUrl}
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
            {isSuccess && groupDetail?.name}
            <IconButton size="small">
              <EditOutlinedIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="header-info flex justify-center gap-8 text-xs items-center tools ">
            <div>
              {isSuccess && groupDetail?.permissions.includes("GROUP_SETTINGS") && (
                <div className="tool-item bg-gray-100 hover:bg-slate-300 rounded-full">
                  <IconButton size="small" color="black">
                    <SettingsOutlinedIcon />
                  </IconButton>
                </div>
              )}
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
        <ListItemButton onClick={toggleMemberList}>
          <ListItemText
            disableTypography
            className="text-base font-bold"
            primary={`Thành viên nhóm (${isSuccess && groupDetail?.totalMember})`}
          />

          {ShowGroupMember ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={ShowGroupMember} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <GroupInfoItem type="member" />
          </List>
        </Collapse>
        <Divider
          sx={{
            margin: 1,
            padding: 0,
            backgroundColor: "#ccc"
          }}
        />
        <ListItemButton onClick={toggleChannelMedia}>
          <ListItemText
            disableTypography
            className="text-base font-bold"
            primary="Bộ sưu tập, tập tin đã gửi"
          />

          {ShowGroupMedia ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={ShowGroupMedia} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <GroupInfoItem type="media" />
          </List>
        </Collapse>
        <ListItemButton onClick={toggleChannelUtility}>
          <ListItemText disableTypography className="text-base font-bold" primary="Bảng tin nhóm" />

          {ShowGroupUtility ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={ShowGroupUtility} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <GroupInfoItem type="utility" permission={isSuccess && groupDetail?.permissions} />
          </List>
        </Collapse>
        <Divider
          sx={{
            margin: 1,
            padding: 0,
            backgroundColor: "#ccc"
          }}
        />
      </div>
    </div>
  );
}
