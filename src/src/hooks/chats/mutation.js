import { useMutation } from "@tanstack/react-query";

import MeetingService from "service/meetingService";
import TaskService from "service/taskService";
import VoteService from "service/voteService";

import { CreateMeetingMutationKey, CreateTaskMutationKey, CreateVoteMutationKey } from "./keys";

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
export const useUpdateTaskMutation = () =>
  useMutation({
    mutationKey: CreateTaskMutationKey,
    mutationFn: (task) => TaskService.updateTask(task)
  });
export const useCreateVoteMutation = () =>
  useMutation({
    mutationKey: CreateVoteMutationKey,
    mutationFn: (vote) => VoteService.createVote(vote)
  });
