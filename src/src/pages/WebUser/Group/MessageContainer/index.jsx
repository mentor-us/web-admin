import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import { Avatar, IconButton } from "@mui/material";

import ListGroup from "pages/WebUser/Home/ListGroup";

export default function MessageContainer() {
  const [showLayout, toggleGroupDetail] = useOutletContext();
  useEffect(() => {
    toggleGroupDetail();
  }, []);
  return (
    <div className="bg-slate-200 h-full flex flex-col justify-between">
      <div className="h-32 flex flex-row justify-between bg-white">
        <Avatar
          alt="Remy Sharp"
          src="https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg"
        />
        <div className="flex justify-center items-center h-16 text-white">
          <IconButton
            className="w-16 h-16"
            size="large"
            variant="text"
            color={showLayout ? "info" : "default"}
            onClick={() => toggleGroupDetail()}
          >
            <ViewSidebarOutlinedIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      <div className="grow overflow-y-scroll overflow-x-hidden">
        <ListGroup />
        <ListGroup />
      </div>
      <div className="">Chat</div>
    </div>
  );
}
