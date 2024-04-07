/* eslint-disable import/prefer-default-export */
import { useMutation } from "@tanstack/react-query";

import channelService from "service/channelService";

import { CreateChannelMutationKey, DeleteChannelMutationKey } from "./keys";

export const useCreateChannelMutation = () =>
  useMutation({
    mutationKey: CreateChannelMutationKey,
    mutationFn: (channel) => channelService.createChannel(channel)
  });

export const useDeleteChannelMutation = () =>
  useMutation({
    mutationKey: DeleteChannelMutationKey,
    mutationFn: (channelId) => channelService.deleteChannel(channelId)
  });
