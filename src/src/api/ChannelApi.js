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
  },
  async searchForward(query = "") {
    const URL = `/api/groups/forward`;
    const response = await AxiosClient.get(URL, {
      params: {
        name: query
      }
    });
    return response;
  },
  async forward(messageId, channelIds) {
    // const URL = `/api/groups/own`;
    const URL = `/api/messages/forward`;
    try {
      const response = await AxiosClient.post(URL, {
        messageId,
        channelIds
      });
      return response.data;
    } catch (err) {
      const error = err;
      console.log(error);
      return [];
    }
  }
};
export default ChannelApi;
