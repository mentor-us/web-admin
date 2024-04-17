import { useQuery } from "@tanstack/react-query";

import VoteService from "service/voteService";
import useMyInfo from "hooks/useMyInfo";

import { GetAllVotesInChannelKey, GetVoteDetailKey } from "./key";

export const useGetVoteDetail = (voteId, select) => {
  const myInfo = useMyInfo();

  return useQuery({
    queryKey: GetVoteDetailKey(voteId),
    queryFn: () => VoteService.getVoteDetail(voteId, myInfo.id),
    enabled: !!voteId && !!myInfo.id,
    select
  });
};

export const useGetChannelVotes = (channelId, select) => {
  const myInfo = useMyInfo();

  return useQuery({
    queryKey: GetAllVotesInChannelKey(channelId),
    queryFn: () => VoteService.getChannelVotes(channelId, myInfo.id),
    enabled: !!channelId,
    select
  });
};
