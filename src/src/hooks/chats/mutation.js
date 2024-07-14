import { useMutation, useQueryClient } from "@tanstack/react-query";

import FaqService from "service/faqService";
import MeetingService from "service/meetingService";
import MessageService from "service/messageService";
import TaskService from "service/taskService";
import VoteService from "service/voteService";
import { GetAllVotesInChannelKey } from "hooks/votes/key";

import {
  AddReactionMutationKey,
  CreateFaqMutationKey,
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
export const useCreateVoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CreateVoteMutationKey,
    mutationFn: (vote) => VoteService.createVote(vote),
    onSuccess: (data) => {
      queryClient.invalidateQueries(GetAllVotesInChannelKey(data?.groupId));
    }
  });
};

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
export const useCreateFaqMutation = () =>
  useMutation({
    mutationKey: CreateFaqMutationKey,
    mutationFn: (task) => FaqService.createFaq(task)
  });
export const useUpdateFaqMutation = () =>
  useMutation({
    mutationKey: CreateFaqMutationKey,
    mutationFn: (task) => FaqService.updateFaq(task)
  });
export const useChangeStatusTaskMutation = () =>
  useMutation({
    mutationKey: "change-status-task",
    mutationFn: (task) => TaskService.changeStatusTask(task)
  });
