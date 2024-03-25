/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";

import channelService from "service/channelService";
import groupsServices from "service/groupsServices";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";

import {
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

export const useGetChannelMembers = (channelId) =>
  useQuery({
    queryKey: GetChannelMembersKey(channelId),
    queryFn: () => channelService.getChannelMembers(channelId),
    enabled: !!channelId
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

  const queryClient = useQueryClient();

  const addNewestMessage = (message) => {
    queryClient.setQueryData(GetAllChatMessageInfinityKey(channelId), (data) => {
      if (!data) {
        return data;
      }

      // console.log(data);
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
    addNewestMessage
  };
};
