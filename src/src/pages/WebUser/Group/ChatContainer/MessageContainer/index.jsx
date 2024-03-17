/* eslint-disable no-unused-vars */
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { useGetMessagesInfinity } from "hooks/chats/queries";
import useMyInfo from "hooks/useMyInfo";

import MessageItems from "./MessageItems";

function MessageContainer(props) {
  const { channelId } = useParams();
  const myInfo = useMyInfo();
  const {
    data: messagesList,
    isSuccess,
    hasNextPage,
    fetchNextPage
  } = useGetMessagesInfinity(myInfo?.id, channelId);

  return (
    <>
      {/* Put the scroll bar always on the bottom */}
      {isSuccess && (
        <InfiniteScroll
          dataLength={messagesList.pages.length}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          next={fetchNextPage}
          hasMore
          style={{ display: "flex", flexDirection: "column-reverse" }}
          inverse
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          className="h-full pt-4"
        >
          {isSuccess &&
            messagesList.pages.map((message) => (
              <MessageItems
                key={message?.id}
                message={message}
                isOwner={myInfo?.id === message?.sender?.id}
              />
            ))}
        </InfiniteScroll>
      )}
    </>
  );
}

MessageContainer.propTypes = {};

export default MessageContainer;
