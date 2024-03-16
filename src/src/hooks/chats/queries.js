/* eslint-disable import/prefer-default-export */
import { useInfiniteQuery } from "@tanstack/react-query";

import MessageService from "service/messageService";

import { GetAllChatMessageInfinityKey } from "./keys";

const PAGE_SIZE = 25;

export const useGetMessagesInfinity = (userId, channelId) =>
  useInfiniteQuery({
    queryKey: GetAllChatMessageInfinityKey(channelId),
    queryFn: ({ pageParam }) => {
      return MessageService.getMessages(userId, channelId, pageParam, PAGE_SIZE);
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.length === PAGE_SIZE ? allPage[0].length / PAGE_SIZE : undefined;
    },
    select(data) {
      return {
        pages: data.pages.flatMap((x) => x),
        pageParams: [...data.pageParams]
      };
    }
  });
