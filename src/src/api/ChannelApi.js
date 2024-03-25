import AxiosClient from "./AxiosClient";

const ChannelApi = {
  createChannel(channel) {
    return AxiosClient.post("/api/channels", channel);
  },
  async getAllChannelsByGroupId(groupId) {
    const searchParam = new URLSearchParams();
    searchParam.append("parentId", groupId);
    const URL = `/api/channels?${searchParam.toString()}`;
    const data = await AxiosClient.get(URL);
    return data;
  },
  async getChannelMember(channelId) {
    const URL = `/api/channels/${channelId}/members`;
    const data = await AxiosClient.get(URL);
    return data;
  },
  async getChannelMedia(channelId) {
    const URL = `/api/groups/${channelId}/media`;
    const data = await AxiosClient.get(URL);
    return data?.data;
  },
  deleteChannel(channelId) {
    const URL = `/api/channels/${channelId}`;
    return AxiosClient.delete(URL);
  }
};
export default ChannelApi;
