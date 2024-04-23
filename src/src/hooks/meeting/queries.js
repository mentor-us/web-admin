/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";

import MeetingService from "service/meetingService";
import { CreateMeetingMutationKey } from "hooks/chats/keys";

import { GetAllMeetingInChannelKey } from "./keys";

// eslint-disable-next-line import/prefer-default-export
export const useGetGroupMeetings = (groupId, select) =>
  useQuery({
    queryKey: GetAllMeetingInChannelKey(groupId),
    queryFn: () => MeetingService.getAllMeetingInChannel(groupId),
    enabled: !!groupId,
    select
  });
