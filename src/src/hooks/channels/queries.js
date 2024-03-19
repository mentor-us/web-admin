/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import channelService from "service/channelService";

import { GetChannelMembersKey } from "./keys";

// eslint-disable-next-line import/prefer-default-export
export const useGetGroupMembers = (groupId) =>
  console.log("groupId", groupId) ||
  useQuery({
    queryKey: GetChannelMembersKey(groupId),
    queryFn: () => channelService.getChannelMembers(groupId),
    enabled: !!groupId
  });
