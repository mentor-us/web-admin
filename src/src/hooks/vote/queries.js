/* eslint-disable import/prefer-default-export */
import { useQuery } from "@tanstack/react-query";

import VoteService from "service/voteService";
import useMyInfo from "hooks/useMyInfo";

import { GetVoteDetailKey } from "./key";

export const useGetVoteDetail = (voteId, select) => {
  const myInfo = useMyInfo();

  return useQuery({
    queryKey: GetVoteDetailKey(voteId),
    queryFn: () => VoteService.getVoteDetail(voteId, myInfo.id),
    enabled: !!voteId && !!myInfo.id,
    select
  });
};
