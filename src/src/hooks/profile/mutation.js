import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import AccountService from "service/accountServices";
import { GetChannelMembersKey } from "hooks/channels/keys";
import { GetWorkspaceQueryKey } from "hooks/groups/keys";

// eslint-disable-next-line import/prefer-default-export
export const useUpdateProfileMutation = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "update-profile",
    mutationFn: (req) => AccountService.updateProfile(req),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: GetChannelMembersKey(params?.channelId || params["*"].split("/")[1])
      });
      queryClient.refetchQueries({
        queryKey: GetWorkspaceQueryKey(params?.groupId)
      });
    }
  });

export const useUpdateAvatarMutation = () =>
  useMutation({
    mutationKey: "update-avatar",
    mutationFn: (req) => AccountService.updateAvatar(req)
  });
