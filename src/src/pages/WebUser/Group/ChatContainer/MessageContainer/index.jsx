import { memo, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

import BouncingDotsLoading from "pages/WebUser/components/BouncingDotsLoading";
import { useGetMessagesInfinity } from "hooks/chats/queries";
import useMyInfo from "hooks/useMyInfo";

import MessageFooterItem from "./MessageFooterItem";
import MessageItems from "./MessageItems";

function MessageContainer({ channelId }) {
  const myInfo = useMyInfo();
  const {
    data: messagesList,
    isSuccess,
    hasNextPage,
    fetchNextPage
  } = useGetMessagesInfinity(myInfo?.id, channelId);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom on init
  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div
      className="overflow-x-hidden message-container"
      id="scrollableDiv"
      style={{
        height: "calc(100% - 10px)",
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse"
      }}
    >
      <InfiniteScroll
        className="pt-4"
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
        style={{ display: "flex", flexDirection: "column-reverse", overflow: "hidden" }}
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
        <div ref={messagesEndRef} />
      </InfiniteScroll>
    </div>
  );
}

MessageContainer.propTypes = {
  channelId: PropTypes.string.isRequired
};

export default memo(MessageContainer);
