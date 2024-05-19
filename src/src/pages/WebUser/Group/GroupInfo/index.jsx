/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { getImageUrlWithKey } from "utils";

import AsyncMDAvatar from "pages/WebUser/components/AsyncMDAvatar";
import GroupInfoItem from "pages/WebUser/Group/GroupInfo/GroupFunction";
import GroupItemDetail from "pages/WebUser/Group/GroupInfo/GroupItemDetail";
import { useGetGroupDetail, useGetWorkSpace } from "hooks/groups/queries";
import {
  ACTION_IMAGE,
  AVATAR_SIZE,
  CHANNEL_PERMISSION,
  CHANNEL_TYPE,
  GROUP_FUNCTION,
  USER_ROLE,
  WALLPAPER_HEIGHT
} from "utils/constants";

import BookMeetingDialog from "../ChatContainer/TextEditor/EditorToolbar/BookMeetingIconButton/BookMeetingDialog";
import CreateFAQ from "../ChatContainer/TextEditor/EditorToolbar/CreateFAQ";
import CreateTaskDialog from "../ChatContainer/TextEditor/EditorToolbar/CreateTaskIconButton/CreateTaskDialog";
import CreateVoteDialog from "../ChatContainer/TextEditor/EditorToolbar/CreateVoteIconButton/CreateVoteDialog";
import ImageIconButton from "../ChatContainer/TextEditor/EditorToolbar/ImageIconButton";
// Define the group information

// eslint-disable-next-line react/prop-types, no-shadow
function renderHeaderInfor(type) {
  if (type === GROUP_FUNCTION.MEMBER) {
    return "Thành viên nhóm";
  }
  if (type === GROUP_FUNCTION.MEETING) {
    return "Lịch hẹn";
  }
  if (type === GROUP_FUNCTION.TASK) {
    return "Công việc";
  }
  if (type === GROUP_FUNCTION.IMAGE || type === GROUP_FUNCTION.FILE) {
    return "Bộ sưu tập";
  }
  if (type === GROUP_FUNCTION.VOTING) {
    return "Bình chọn";
  }
  if (type === GROUP_FUNCTION.FAQ) {
    return "FAQ";
  }

  return "Thông tin hội thoại";
}
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
  const [showTypeScreen, setShowTypeScreen] = useState("");
  const [showAddFunction, setShowAddFunction] = useState(false);
  // click to show member list
  const selectedType = (type) => {
    setShowTypeScreen(type);
  };
  const headerInfo = renderHeaderInfor(showTypeScreen);
  // eslint-disable-next-line consistent-return
  const clickedAddFunction = (type) => {
    setShowAddFunction(true);
  };
  const handleCloseDialog = () => {
    setShowAddFunction(false);
  };
  const renderAddFunctionDialog = () => {
    if (showAddFunction && showTypeScreen !== "") {
      switch (showTypeScreen) {
        case GROUP_FUNCTION.MEETING:
          return (
            <BookMeetingDialog
              open={showAddFunction}
              handleClose={handleCloseDialog}
              meetingId="" // Pass necessary props here for Meeting Dialog
            />
          );
        case GROUP_FUNCTION.TASK:
          // Render Task dialog or perform task-related action
          return (
            <CreateTaskDialog
              open={showAddFunction}
              handleClose={handleCloseDialog}
              taskId="" // I assume msgIdDialog is defined somewhere
            />
          );
        case GROUP_FUNCTION.VOTING:
          // Render Voting dialog or perform voting-related action
          return <CreateVoteDialog open={showAddFunction} handleClose={handleCloseDialog} />;
        case GROUP_FUNCTION.FAQ:
          // Render FAQ dialog or perform FAQ-related action
          return <CreateFAQ open={showAddFunction} handleClose={handleCloseDialog} faqId="" />;
        default:
          return null;
      }
    }
    return null;
  };

  // const navigate = useNavigate();
  const { channelId, groupId } = useParams();
  const imageIconButtonRef = useRef(null);

  const {
    data: groupDetail,
    isLoading,
    isSuccess
  } = useGetGroupDetail(channelId === "null" ? null : channelId);

  const { data: workspace } = useGetWorkSpace(groupId);
  if (isLoading) {
    return null;
  }

  if (!channelId) {
    return null;
  }

  const handleAvatarClick = () => {
    // Trigger click event on ImageIconButton
    if (imageIconButtonRef.current) {
      imageIconButtonRef.current.click();
    }
  };

  return (
    <div className="flex flex-col w-80 h-full bg-white border-r-[2px]">
      <Box className="min-h-16 h-16 p-4 bg-white">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          className="w-full font-bold text-base"
        >
          {showTypeScreen !== "" ? (
            <IconButton
              className="!absolute !left-0 hover:!bg-slate-300 rounded-full"
              size="small"
              onClick={() => {
                selectedType("");
              }}
            >
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
          ) : null}
          <Tooltip title={headerInfo}>
            <span className="line-clamp-1 max-w-[74%]">{headerInfo}</span>
          </Tooltip>
          {showTypeScreen !== "" &&
          showTypeScreen !== GROUP_FUNCTION.MEMBER &&
          showTypeScreen !== GROUP_FUNCTION.IMAGE &&
          showTypeScreen !== GROUP_FUNCTION.FILE ? (
            <IconButton
              className="!absolute !right-0 hover:!bg-slate-300 rounded-full"
              size="small"
              onClick={(e) => {
                clickedAddFunction(showTypeScreen);
              }}
            >
              <AddIcon />
            </IconButton>
          ) : null}
        </Box>
      </Box>
      <hr />
      {showTypeScreen === "" ? (
        <div className="overflow-auto">
          <div className="header-info p-3">
            <div className="header-info ava flex justify-center items-center space-x-2 p-2 ">
              {/* <AsyncMDAvatar
                src={groupDetail?.imageUrl ?? workspace?.imageUrl}
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
              /> */}

              <div className="hidden">
                <ImageIconButton
                  ref={imageIconButtonRef}
                  channelId={groupId}
                  type={ACTION_IMAGE.UPDATE_AVATAR}
                />
              </div>
              <div className="!relative">
                <Avatar
                  sx={{ width: 54, height: 54 }}
                  src={getImageUrlWithKey(groupDetail?.imageUrl ?? workspace?.imageUrl)}
                />
                {groupDetail.type !== CHANNEL_TYPE.PRIVATE_MESSAGE &&
                  groupDetail.role === USER_ROLE.MENTOR && (
                    <div className="absolute hover:cursor-pointer bottom-0 right-0 translate-x-1 translate-y-1">
                      <Avatar
                        sx={{
                          height: 26,
                          width: 26
                        }}
                        onClick={handleAvatarClick}
                      >
                        <CameraAltOutlinedIcon />
                      </Avatar>
                    </div>
                  )}
              </div>
            </div>
            <div className="header-info name w-full font-bold text-base border-white flex justify-center items-center p-1">
              {isSuccess && groupDetail?.name}
            </div>
            <div className="header-info flex justify-center gap-8 text-xs items-center tools ">
              {/* <div>
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
              </div> */}
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
              <GroupInfoItem type="member" selectedType={selectedType} />
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
              <GroupInfoItem type="media" selectedType={selectedType} />
            </List>
          </Collapse>
          <ListItemButton onClick={toggleChannelUtility}>
            <ListItemText
              disableTypography
              className="text-base font-bold"
              primary="Bảng tin nhóm"
            />

            {ShowGroupUtility ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={ShowGroupUtility} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <GroupInfoItem
                type="utility"
                permission={isSuccess && groupDetail?.permissions}
                selectedType={selectedType}
              />
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
      ) : (
        <GroupItemDetail type={showTypeScreen} />
      )}
      {renderAddFunctionDialog()}
    </div>
  );
}
