/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import channelService from "service/channelService";

import { GetChannelMediaKey, GetChannelMembersKey } from "./keys";

// eslint-disable-next-line import/prefer-default-export
export const useGetGroupMembers = (groupId) =>
  useQuery({
    queryKey: GetChannelMembersKey(groupId),
    queryFn: () => channelService.getChannelMembers(groupId),
    enabled: !!groupId
  });
export const useGetGroupMedia = (groupId) =>
  useQuery({
    queryKey: GetChannelMediaKey(groupId),
    queryFn: () => channelService.getChannelMedia(groupId),
    enabled: !!groupId
  });
