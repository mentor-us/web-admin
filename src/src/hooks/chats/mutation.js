import { useMutation } from "@tanstack/react-query";

import MeetingService from "service/meetingService";
import TaskService from "service/taskService";

import { CreateMeetingMutationKey, CreateTaskMutationKey } from "./keys";

export const useCreateMeetingMutation = () =>
  useMutation({
    mutationKey: CreateMeetingMutationKey,
    mutationFn: (meeting) => MeetingService.createMeeting(meeting)
  });

export const useCreateTaskMutation = () =>
  useMutation({
    mutationKey: CreateTaskMutationKey,
    mutationFn: (task) => TaskService.createTask(task)
  });
