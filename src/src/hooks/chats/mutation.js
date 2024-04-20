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
  DeleteMessageMutationKey,
  EditMessageMutationKey,
  RemoveReactionMutationKey
} from "./keys";

export const useCreateMeetingMutation = () =>
  useMutation({
    mutationKey: CreateMeetingMutationKey,
    mutationFn: (meeting) => MeetingService.createMeeting(meeting)
  });
export const useUpdateMeetingMutation = () =>
  useMutation({
    mutationKey: CreateMeetingMutationKey,
    mutationFn: (meeting) => MeetingService.updateMeeting(meeting)
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

export const useEditMessageMutation = () =>
  useMutation({
    mutationKey: EditMessageMutationKey,
    mutationFn: ({ messageId, newContent }) => MessageService.editMessage(messageId, newContent)
  });

export const useDeleteMessageMutation = () =>
  useMutation({
    mutationKey: DeleteMessageMutationKey,
    mutationFn: ({ messageId }) => MessageService.deleteMessage(messageId)
  });
