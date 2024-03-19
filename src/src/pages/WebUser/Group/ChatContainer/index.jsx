/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import { Avatar, IconButton } from "@mui/material";

import ListGroup from "pages/WebUser/Home/ListGroup";
import { useGetGroupDetail } from "hooks/groups/queries";

import ChatContainerHeader from "./ChatContainerHeader";
import MessageContainer from "./MessageContainer";
import TextEditor from "./TextEditor";
import "./style.css";

function ChatContainer() {
  const { channelId } = useParams();
  const [showLayout, toggleGroupDetail] = useOutletContext();

  const { data: groupDetail, isLoading } = useGetGroupDetail(
    channelId === "null" ? null : channelId
  );

  return (
    <div className="bg-slate-200 h-full w-full flex flex-col justify-between">
      <div className="">
        <ChatContainerHeader
          isOpenChannelInfo={showLayout}
          toggleOpenChannelInfo={toggleGroupDetail}
          channelName={groupDetail?.name}
          isLoadingGroupDetail={isLoading}
        />
      </div>
      <MessageContainer channelId={channelId} />
      <TextEditor className="" />
    </div>
  );
}

export default ChatContainer;
