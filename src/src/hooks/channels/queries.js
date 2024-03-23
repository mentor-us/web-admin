import { useQuery } from "@tanstack/react-query";

import channelService from "service/channelService";
import groupsServices from "service/groupsServices";

import { GetChannelMediaKey, GetChannelMembersKey, GetGroupsMembersKey } from "./keys";

export const useGetGroupMembers = (groupId, select) =>
  useQuery({
    queryKey: GetGroupsMembersKey(groupId),
    queryFn: () => groupsServices.getGroupMembers(groupId),
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
