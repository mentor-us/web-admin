import AxiosClient from "./AxiosClient";

const ChannelApi = {
  async getChannelMember(memberId) {
    const URL = `/api/channels/${memberId}/members`;
    const data = await AxiosClient.get(URL);
    return data;
  },
  async getChannelMedia(memberId) {
    const URL = `/api/groups/${memberId}/media`;
    const data = await AxiosClient.get(URL);
    return data?.data;
  }
};
export default ChannelApi;
