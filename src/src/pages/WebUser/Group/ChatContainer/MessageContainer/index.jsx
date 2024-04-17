// eslint-disable-next-line no-unused-vars
import { memo, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { SOCKET_EVENT } from "context/socket";
import PropTypes from "prop-types";

import BouncingDotsLoading from "pages/WebUser/components/BouncingDotsLoading";
import SocketService from "service/socketService";
import { useMessageQueryState } from "hooks/channels/queries";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import { useGetMessagesInfinity } from "hooks/chats/queries";
import useMyInfo from "hooks/useMyInfo";

import MessageFooterItem from "./MessageFooterItem";
import MessageItems from "./MessageItems";

function MessageContainer({ channelId }) {
  const myInfo = useMyInfo();
  const queryClient = useQueryClient();
  const {
    data: messagesList,
    isSuccess,
    hasNextPage,
    fetchNextPage
  } = useGetMessagesInfinity(myInfo?.id, channelId);
  const { manualAddNewMessage } = useMessageQueryState(channelId);

  useEffect(() => {
    const onReceiveMessage = (response) => {
      manualAddNewMessage(response);
    };

    const onReceiveReaction = () => {
      queryClient.invalidateQueries({
        queryKey: GetAllChatMessageInfinityKey(channelId)
      });
    };

    const onRemoveReaction = () => {
      queryClient.invalidateQueries({
        queryKey: GetAllChatMessageInfinityKey(channelId)
      });
    };

    const onVoting = () => {
      queryClient.invalidateQueries({
        queryKey: GetAllChatMessageInfinityKey(channelId)
      });
    };

    // Join chat room
    SocketService.joinChannel(channelId, myInfo.id);

    SocketService.registerHandler(SOCKET_EVENT.RECEIVE_MESSAGE, onReceiveMessage);
    SocketService.registerHandler(SOCKET_EVENT.RECEIVE_REACT_MESSAGE, onReceiveReaction);
    SocketService.registerHandler(SOCKET_EVENT.REMOVE_REACT_MESSAGE, onRemoveReaction);
    SocketService.registerHandler(SOCKET_EVENT.RECEIVE_VOTING, onVoting);

    return () => {
      SocketService.unregisterHandler(SOCKET_EVENT.RECEIVE_MESSAGE, onReceiveMessage);
      SocketService.unregisterHandler(SOCKET_EVENT.RECEIVE_REACT_MESSAGE, onReceiveReaction);
      SocketService.unregisterHandler(SOCKET_EVENT.REMOVE_REACT_MESSAGE, onRemoveReaction);
      SocketService.unregisterHandler(SOCKET_EVENT.RECEIVE_VOTING, onVoting);

      SocketService.leaveChannel(channelId, myInfo.id);
    };
  }, [channelId, myInfo]);

  return (
    <div
      className="overflow-x-hidden message-container "
      id="scrollableDiv"
      style={{
        height: "calc(100% - 10px)",
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse"
      }}
    >
      <InfiniteScroll
        className="pb-4 pt-4 gap-y-4"
        scrollableTarget="scrollableDiv"
        dataLength={
          !isSuccess
            ? 0
            : messagesList.pages.reduce((prev, curr) => {
                return prev + curr.length;
              }, 0)
        }
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          overflow: "hidden",
          height: "calc(100% - 10px)"
        }}
        inverse
        loader={
          <Box className="py-2">
            <BouncingDotsLoading />
          </Box>
        }
        endMessage={<MessageFooterItem />}
      >
        {isSuccess &&
          messagesList.pages.map((page) => {
            return page.map((item) => {
              return (
                <MessageItems
                  key={item?.id}
                  message={item}
                  isOwner={myInfo?.id === item?.sender?.id}
                />
              );
            });
          })}
        <div />
      </InfiniteScroll>
    </div>
  );
}

MessageContainer.propTypes = {
  channelId: PropTypes.string.isRequired
};

export default memo(MessageContainer);
