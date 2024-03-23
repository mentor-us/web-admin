import AxiosClient from "./AxiosClient";

const ChannelApi = {
  createChannel(channel) {
    return AxiosClient.post("/api/channels", channel);
  },
  async getChannelMember(memberId) {
    const URL = `/api/channels/${memberId}/members`;
    const data = await AxiosClient.get(URL);
    return data;
  },
  async getChannelMedia(memberId) {
    const URL = `/api/groups/${memberId}/media`;
    const data = await AxiosClient.get(URL);
    return data?.data;
  },
  deleteChannel(channelId) {
    const URL = `/api/channels/${channelId}`;
    return AxiosClient.delete(URL);
  }
};
export default ChannelApi;
