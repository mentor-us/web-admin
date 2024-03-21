import React from "react";
import { NavLink } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EventIcon from "@mui/icons-material/Event";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button, IconButton, Tooltip } from "@mui/material";

import MDAvatar from "components/MDComponents/MDAvatar";
import useMyInfo from "hooks/useMyInfo";

import ListGroup from "../ListGroup";

export default function SideBar() {
  const myInfo = useMyInfo();

  return (
    <div className="flex flex-col justify-between h-full" style={{ backgroundColor: "#0091FF" }}>
      <div className="h-20 flex flex-col hover:bg-sky-600">
        <Tooltip title={myInfo.name} placement="right">
          <Button>
            <MDAvatar
              src={myInfo.imageUrl}
              alt="detail-image"
              shadow="md"
              size="md"
              sx={{
                alignSelf: "center",
                background: "white",
                mx: 0,
                border: "1px solid white",
                "border-radius": "5px"
              }}
            />
          </Button>
        </Tooltip>
      </div>
      {/* <hr /> */}
      <div className="grow overflow-y-scroll no-scrollbar">
        <ListGroup />
      </div>
      <div className="">
        <div className="flex justify-center items-center h-16 text-white hover:bg-sky-600">
          <NavLink className="w-full h-full flex justify-center items-center " to="upcoming-event">
            {({ isActive }) => (
              <IconButton color="white" aria-label="Setting">
                {isActive ? (
                  <EventIcon fontSize="medium" />
                ) : (
                  <EventOutlinedIcon fontSize="medium" />
                )}
              </IconButton>
            )}
          </NavLink>
        </div>
        <div className="flex justify-center items-center h-16 text-white hover:bg-sky-600">
          <NavLink className="w-full h-full flex justify-center items-center " to="calendar">
            {({ isActive }) => (
              <IconButton color="white" aria-label="Setting">
                {isActive ? (
                  <CalendarMonthIcon fontSize="medium" />
                ) : (
                  <CalendarMonthOutlinedIcon fontSize="medium" />
                )}
              </IconButton>
            )}
          </NavLink>
        </div>
        <div className="flex justify-center items-center h-16 text-white hover:bg-sky-600">
          {/* <SettingsIcon /> */}
          <IconButton color="white" aria-label="Setting">
            {false ? (
              <SettingsIcon fontSize="medium" />
            ) : (
              <SettingsOutlinedIcon fontSize="medium" />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
}
