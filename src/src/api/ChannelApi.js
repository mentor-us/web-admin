import AxiosClient from "./AxiosClient";

const ChannelApi = {
  async getChannelMember(memberId) {
    const URL = `/api/channels/${memberId}/members`;
    const data = await AxiosClient.get(URL);
    return data;
  }
};
export default ChannelApi;
