import VoteApi from "api/VoteApi";

const VoteService = {
  createVote: (vote) => VoteApi.createVote(vote)
};

export default VoteService;
