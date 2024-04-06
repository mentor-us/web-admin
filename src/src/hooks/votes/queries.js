/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";

import votesService from "service/votesService";

import { GetAllVotesInGroupKey } from "./keys";

// eslint-disable-next-line import/prefer-default-export
export const useGetGroupVotes = (groupId, select) =>
  useQuery({
    queryKey: GetAllVotesInGroupKey(groupId),
    queryFn: () => votesService.getAllVotesByGroupId(groupId),
    enabled: !!groupId,
    select
  });
