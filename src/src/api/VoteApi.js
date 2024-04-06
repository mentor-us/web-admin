import AxiosClient from "./AxiosClient";

const VOTE_URL = "/api/votes";
const VOTING_URL = "/api/votings";

const VoteApi = {
  getChannelVotes: (channelId) => AxiosClient.get(`/api/channels/${channelId}/votes`),
  createVote: (vote) => AxiosClient.post(VOTE_URL, vote),
  getVoteDetail: (voteId) => AxiosClient.get(`${VOTE_URL}/${voteId}`),
  updateVote: (voteId, payload) => AxiosClient.patch(`${VOTING_URL}/${voteId}`, payload),
  doVoting: (voteId, payload) => AxiosClient.post(`${VOTE_URL}/${voteId}/voting`, payload),
  close: (voteId) => AxiosClient.patch(`${VOTE_URL}/${voteId}/close`),
  reopenVote: (voteId) => AxiosClient.patch(`${VOTE_URL}/${voteId}/reopen`)
};

export default VoteApi;
