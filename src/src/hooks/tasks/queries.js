/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";

import MeetingService from "service/meetingService";
import TaskService from "service/taskService";

import { GetAllTaskInChannelKey } from "./keys";

// eslint-disable-next-line import/prefer-default-export
export const useGetChannelTasks = (channelId, select) =>
  useQuery({
    queryKey: GetAllTaskInChannelKey(channelId),
    queryFn: () => TaskService.getAllMeetingInChannel(channelId),
    enabled: !!channelId,
    select
  });
