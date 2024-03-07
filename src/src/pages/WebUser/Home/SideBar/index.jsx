import React from "react";
import { NavLink } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button, IconButton, Tooltip } from "@mui/material";

import MDAvatar from "components/MDComponents/MDAvatar";

import ListGroup from "../ListGroup";

export default function SideBar() {
  return (
    <div className="flex flex-col justify-between h-full" style={{ backgroundColor: "#0091FF" }}>
      <div className="h-20 flex flex-col hover:bg-sky-600">
        <Tooltip title="thong89x" placement="right">
          <Button>
            <MDAvatar
              src="https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg"
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
      <div className="grow overflow-y-scroll overflow-x-hidden">
        <ListGroup />
      </div>
      <div className="">
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
