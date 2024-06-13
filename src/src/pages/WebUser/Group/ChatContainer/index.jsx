/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import { Avatar, IconButton } from "@mui/material";

import ListGroup from "pages/WebUser/Home/ListGroup";
import { useGetGroupDetail } from "hooks/groups/queries";

// import ForwardMessageDialog from "./MessageContainer/ForwardMessageDialog";
import ChatContainerHeader from "./ChatHeaderContainer";
import { ForwardContext } from "./ForwardContext";
import ForwardMessageDialog from "./ForwardMessageDialog";
// eslint-disable-next-line import/no-cycle
import MessageContainer from "./MessageContainer";
import TextEditor from "./TextEditor";
import "./style.css";

function ChatContainer() {
  const { channelId } = useParams();
  const [showLayout, toggleGroupDetail] = useOutletContext();
  const [openDialogForward, setOpenDialogForward] = useState(false);
  const [messageForward, setMessageForward] = useState(null);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const forwardMessage = (msg) => {
    setMessageForward(msg);
    setOpenDialogForward(true);
  };
  const { data: groupDetail, isLoading } = useGetGroupDetail(
    channelId === "null" ? null : channelId
  );
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ForwardContext.Provider value={forwardMessage}>
      <div className="bg-slate-200 h-full flex flex-col justify-between">
        <div className="">
          <ChatContainerHeader
            isOpenChannelInfo={showLayout}
            toggleOpenChannelInfo={toggleGroupDetail}
            channelName={groupDetail?.name}
            isLoadingGroupDetail={isLoading}
          />
        </div>
        <MessageContainer channelId={channelId} />
        <TextEditor className="" channelId={channelId} />
        {openDialogForward && (
          <ForwardMessageDialog
            open={openDialogForward}
            message={messageForward}
            handleClose={() => setOpenDialogForward(false)}
          />
        )}
      </div>
    </ForwardContext.Provider>
  );
}

export default ChatContainer;
