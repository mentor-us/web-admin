/* eslint-disable import/prefer-default-export */
import { useMutation } from "@tanstack/react-query";

import VoteService from "service/voteService";

import { VotingMutationKey } from "./key";

export const useVotingMutation = () =>
  useMutation({
    mutationKey: VotingMutationKey,
    mutationFn: (data) => VoteService.doVoting(data.voteId, data)
  });
