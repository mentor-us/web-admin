/* eslint-disable import/prefer-default-export */
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import channelService from "service/channelService";
import { GetWorkspaceQueryKey } from "hooks/groups/keys";

import { CreateChannelMutationKey, DeleteChannelMutationKey } from "./keys";

export const useCreateChannelMutation = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CreateChannelMutationKey,
    mutationFn: (channel) => channelService.createChannel(channel),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: GetWorkspaceQueryKey(params?.groupId)
      });
    }
  });
};

export const useDeleteChannelMutation = () =>
  useMutation({
    mutationKey: DeleteChannelMutationKey,
    mutationFn: (channelId) => channelService.deleteChannel(channelId)
  });
