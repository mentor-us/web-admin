import { useMutation } from "@tanstack/react-query";

import MeetingService from "service/meetingService";

import { CreateMeetingMutationKey } from "./keys";

// eslint-disable-next-line import/prefer-default-export
export const useCreateMeetingMutation = () =>
  useMutation({
    mutationKey: CreateMeetingMutationKey,
    mutationFn: (meeting) => MeetingService.createMeeting(meeting)
  });
