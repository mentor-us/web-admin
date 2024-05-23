/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import channelService from "service/channelService";
import groupsServices from "service/groupsServices";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import useChatStore from "hooks/client/useChatStore";
import { GetWorkspaceQueryKey } from "hooks/groups/keys";
import { UPLOAD_STATUS } from "utils/constants";

import {
  GetAllChannelsForwardKey,
  GetAllChannelsKey,
  GetChannelMediaKey,
  GetChannelMembersKey,
  GetGroupsMembersKey
} from "./keys";

export const useGetGroupMembers = (groupId, select) =>
  useQuery({
    queryKey: GetGroupsMembersKey(groupId),
    queryFn: () => groupsServices.getGroupMembers(groupId),
    enabled: !!groupId,
    select
  });

export const useGetAllChannelsByGroupId = (groupId, select) =>
  useQuery({
    queryKey: GetAllChannelsKey(groupId),
    queryFn: () => channelService.getAllChannelsByGroupId(groupId),
    enabled: !!groupId,
    select
  });
export const useGetAllChannelsCanForward = (name, select) =>
  useQuery({
    queryKey: ["channels", name],
    queryFn: () => channelService.getAllChannelsCanForward(name),
    select
  });

export const useGetChannelMembers = (channelId, select) =>
  useQuery({
    queryKey: GetChannelMembersKey(channelId),
    queryFn: () => channelService.getChannelMembers(channelId),
    enabled: !!channelId,
    select
  });

export const useGetGroupMedia = (groupId) =>
  useQuery({
    queryKey: GetChannelMediaKey(groupId),
    queryFn: () => channelService.getChannelMedia(groupId),
    enabled: !!groupId
  });

export const useMessageQueryState = (channelId) => {
  if (!channelId) {
    throw new Error("Required `channelId`!");
  }

  const chatStore = useChatStore();
  const queryClient = useQueryClient();
  const { groupId } = useParams();

  if (!groupId) {
    throw new Error("Required `groupId`!");
  }

  const manualAddNewMessage = (message) => {
    queryClient.setQueryData(GetAllChatMessageInfinityKey(channelId), (data) => {
      const { pages } = data;
      const [firstPage, ...restPages] = pages;
      if (firstPage.some((item) => item.id === message.id)) {
        return data;
      }

      return {
        ...data,
        pages: [[message, ...firstPage], ...restPages]
      };
    });
  };

  const updateNewFileMessageStatus = (message, newUrl) => {
    queryClient.setQueryData(GetAllChatMessageInfinityKey(channelId), (data) => {
      const pages = [...data.pages];

      const [firstPage, ...restPages] = pages;

      return {
        ...data,
        pages: [
          [
            ...firstPage.map((item) => {
              if (item.id === message.id) {
                return {
                  ...item,
                  file: {
                    ...item.file,
                    url: newUrl,
                    uploadStatus: newUrl ? UPLOAD_STATUS.SUCCESS : UPLOAD_STATUS.FAIL
                  }
                };
              }

              return item;
            })
          ],
          ...restPages
        ]
      };
    });
  };

  const updateNewImageMessageStatus = (message, uploaded) => {
    queryClient.setQueryData(GetAllChatMessageInfinityKey(channelId), (data) => {
      const pages = [...data.pages];

      if (pages && pages.length >= 1) {
        // eslint-disable-next-line no-param-reassign
        pages[0] = [
          ...pages[0].map((item) => {
            if (item.id === message.id) {
              return {
                ...item,
                uploadFailed: !uploaded,
                images: item.images?.map((img) => ({
                  ...img,
                  isUploading: false
                }))
              };
            }

            return item;
          })
        ];
      }

      return {
        pages,
        pageParams: data.pageParams
      };
    });
  };

  const updateChannelState = () => {
    chatStore.addUnseenMessageChannelId(channelId);
    queryClient.invalidateQueries({
      queryKey: GetWorkspaceQueryKey(groupId)
    });
  };

  const seenChannelState = () => {
    chatStore.removeUnseenMessageChannelId(channelId);
  };

  const addNewestMessage = (message) => {
    queryClient.setQueryData(GetAllChatMessageInfinityKey(channelId), (data) => {
      if (!data) {
        return data;
      }

      const [firstPage, ...rest] = data.pages;
      const newPage = [...firstPage];
      newPage.unshift(message);

      return {
        ...data,
        pages: [[...newPage], ...rest]
      };
    });
  };

  return {
    manualAddNewMessage,
    updateNewImageMessageStatus,
    updateNewFileMessageStatus,
    addNewestMessage,
    updateChannelState,
    seenChannelState
  };
};
