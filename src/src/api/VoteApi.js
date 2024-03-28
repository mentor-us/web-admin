import AxiosClient from "./AxiosClient";

const VoteApi = {
  async getAllVotesByGroupId(channelId) {
    const URL = `/api/votes?groupId=${channelId}`;
    const data = await AxiosClient.get(URL);
    return data;
  }
};

export default VoteApi;
