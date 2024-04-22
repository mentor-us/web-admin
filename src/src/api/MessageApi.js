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

  sendFileMessage: ({ messageId, groupId, senderId, file }) => {
    const URL = `api/messages/file`;
    const formData = new FormData();

    formData.append("file", file);

    formData.append("id", messageId);
    formData.append("groupId", groupId);
    formData.append("senderId", senderId);

    return AxiosClient.post(URL, formData, {
      timeout: 20000,
      headers: {
        accept: "application/json",
        "content-type": "multipart/form-data"
      }
    });
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
  },

  addReaction: (messageId, senderId, emojiId) => {
    const URL = `api/messages/react`;
    return AxiosClient.post(URL, {
      messageId,
      senderId,
      emojiId
    });
  },
  removeReaction: (messageId, senderId) => {
    const URL = `api/messages/react?messageId=${messageId}&senderId=${senderId}`;
    return AxiosClient.delete(URL);
  },

  editMessage: async (messageId, newContent) => {
    const URL = `api/messages/edit`;
    return AxiosClient.post(URL, {
      messageId,
      newContent
    });
  },

  deleteMessage: async (messageId) => {
    const URL = `api/messages/${messageId}`;
    return AxiosClient.delete(URL);
  }
};

export default MessageApi;
