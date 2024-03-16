/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import { Avatar, IconButton } from "@mui/material";

import ListGroup from "pages/WebUser/Home/ListGroup";

import ChatContainerHeader from "./ChatContainerHeader";
import "./style.css";

function ChatContainer() {
    const { channelId} = useParams();
  const [showLayout, toggleGroupDetail] = useOutletContext();

  const {data: channelInfo} = use

  return (
    <div className="bg-slate-200 h-full w-full flex flex-col justify-between">
      <ChatContainerHeader
        isOpenChannelInfo={showLayout}
        toggleOpenChannelInfo={toggleGroupDetail}
        channelName={}
      />

      <div className="grow overflow-y-scroll overflow-x-hidden message-container">
        <ListGroup />
        <ListGroup />
      </div>
      <div className="">TextEditor</div>
    </div>
  );
}

export default ChatContainer;
