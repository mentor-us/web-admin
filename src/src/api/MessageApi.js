import AxiosClient from "./AxiosClient";

const MESSAGE_API_URL = "api/messages";

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
  },

  sendImagesMessage: async ({ messageId, groupId, senderId, images }) => {
    const POST_IMAGES_URL = `${MESSAGE_API_URL}/images`;

    const formData = new FormData();

    images.forEach((item) => formData.append("files", item));
    formData.append("id", messageId);
    formData.append("groupId", groupId);
    formData.append("senderId", senderId);

    try {
      await AxiosClient.post(POST_IMAGES_URL, formData, {
        timeout: 20000,
        headers: {
          accept: "application/json",
          "content-type": "multipart/form-data"
        }
      });
    } catch (error) {
      console.log("MessageApi.sendImagesMessage:", error);
      return false;
    }

    return true;
  }
};

export default MessageApi;
