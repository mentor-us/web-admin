/* eslint-disable import/prefer-default-export */
import { useMutation } from "@tanstack/react-query";

import VoteService from "service/voteService";
import { VOTE_STATUS } from "utils/constants";

import { ToggleBlockMutationKey, VotingMutationKey } from "./key";

export const useVotingMutation = () =>
  useMutation({
    mutationKey: VotingMutationKey,
    mutationFn: (data) => VoteService.doVoting(data.voteId, data)
  });

export const useToggleBlockVote = () =>
  useMutation({
    mutationKey: ToggleBlockMutationKey,
    mutationFn: ({ currentStatus, voteId }) => {
      if (currentStatus === VOTE_STATUS.OPEN) {
        return VoteService.close(voteId);
      }
      return VoteService.reopenVote(voteId);
    }
  });
