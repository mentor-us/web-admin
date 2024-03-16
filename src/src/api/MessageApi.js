import AxiosClient from "./AxiosClient";

const MessageApi = {
  getMessages: async (groupId, page = 0, size = 25) => {
    const URL = `api/messages?groupId=${groupId}&page=${page}&size=${size}`;
    try {
      const response = await AxiosClient.get(URL);
      return response;
    } catch (error) {
      console.log("@API_MESSAGE_ERROR: ", error);
      return [];
    }
  }
};

export default MessageApi;
