/* eslint-disable import/prefer-default-export */
import { useMutation } from "@tanstack/react-query";

import groupsServices from "service/groupsServices";

import { PinMessageMutationKey, RemovePinMessageMutationKey } from "./keys";

export const useRemovePinMessageMutation = () =>
  useMutation({
    mutationKey: RemovePinMessageMutationKey,
    mutationFn: ({ channelId, messageId }) => groupsServices.unpinMessage(channelId, messageId)
  });

export const usePinMessageMutation = () =>
  useMutation({
    mutationKey: PinMessageMutationKey,
    mutationFn: ({ channelId, messageId }) => groupsServices.pinMessage(channelId, messageId)
  });
