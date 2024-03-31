import AxiosClient from "./AxiosClient";

const VOTE_URL = "/api/votes";

const VoteApi = {
  createVote: (vote) => AxiosClient.post(VOTE_URL, vote)
};

export default VoteApi;
