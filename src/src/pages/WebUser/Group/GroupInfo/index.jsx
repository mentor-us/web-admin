import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import IconButton from "@mui/material/IconButton";

import MDAvatar from "components/MDComponents/MDAvatar";
// Define the group information
const groupInfoExample = {
  name: "Nguyen van hau",
  avatar: "https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg",
  tools: "haha"
};

export default function GroupInfo() {
  return (
    <div className="flex flex-col w-80 h-full bg-white border-r-[2px]">
      <div className="w-full font-bold text-base border-white flex justify-center items-center space-x-4 p-4">
        Thông tin hội thoại
      </div>
      <hr />
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
            <div className="tool-item bg-gray-300 hover:bg-slate-300 rounded-full">
              <IconButton size="small" color="black">
                <SettingsOutlinedIcon />
              </IconButton>
            </div>
          </div>
          <div className="tool-item bg-gray-300 hover:bg-slate-300 rounded-full">
            <IconButton size="small" color="black">
              <NotificationsOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
