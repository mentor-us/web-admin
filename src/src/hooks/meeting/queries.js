/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";

import MeetingService from "service/meetingService";

import { GetAllMeetingInGroupKey } from "./keys";

// eslint-disable-next-line import/prefer-default-export
export const useGetGroupMeetings = (groupId, select) =>
  useQuery({
    queryKey: GetAllMeetingInGroupKey(groupId),
    queryFn: () => MeetingService.getAllMeetingInGroup(groupId),
    enabled: !!groupId,
    select
  });
