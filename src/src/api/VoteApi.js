import AxiosClient from "./AxiosClient";

const VOTE_URL = "/api/votes";

const VoteApi = {
  createVote: (vote) => AxiosClient.post(VOTE_URL, vote), // Added comma at the end
  async getAllVotesByGroupId(channelId) {
    const URL = `/api/votes?groupId=${channelId}`;
    const { data } = await AxiosClient.get(URL); // Destructure data from the response
    return data;
  }
};

export default VoteApi;
