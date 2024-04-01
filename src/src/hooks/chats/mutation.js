import { useMutation } from "@tanstack/react-query";

import MeetingService from "service/meetingService";
import MessageService from "service/messageService";
import TaskService from "service/taskService";
import VoteService from "service/voteService";

import {
  AddReactionMutationKey,
  CreateMeetingMutationKey,
  CreateTaskMutationKey,
  CreateVoteMutationKey,
  RemoveReactionMutationKey
} from "./keys";

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

export const useCreateVoteMutation = () =>
  useMutation({
    mutationKey: CreateVoteMutationKey,
    mutationFn: (vote) => VoteService.createVote(vote)
  });

export const useAddReactMutation = () =>
  useMutation({
    mutationKey: AddReactionMutationKey,
    mutationFn: ({ messageId, senderId, emojiId }) =>
      MessageService.addReaction(messageId, senderId, emojiId)
  });

export const useRemoveReactMutation = () =>
  useMutation({
    mutationKey: RemoveReactionMutationKey,
    mutationFn: ({ messageId, senderId }) => MessageService.removeReaction(messageId, senderId)
  });
