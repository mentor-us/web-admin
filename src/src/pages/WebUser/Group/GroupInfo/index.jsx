import React from "react";
import DraftsIcon from "@mui/icons-material/Drafts";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/Inbox";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { AccordionDetails } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

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
        <hr className="bg-gray-200 pt-1" />
        <Accordion defaultExpanded square>
          <AccordionSummary
            className="font-bold text-base"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Thành viên nhóm
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItemButton>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        {/* <hr className="bg-gray-200 pt-1" /> */}
        <Accordion defaultExpanded square>
          <AccordionSummary
            className="font-bold text-base"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Bảng tin nhóm
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItemButton>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
