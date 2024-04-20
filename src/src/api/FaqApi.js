import AxiosClient from "./AxiosClient";

const FAQ_URL = "/api/faqs";

const FaqApi = {
  createFaq: (task) => AxiosClient.post(FAQ_URL, task),
  getDetailFaq: (taskId, params = {}) => AxiosClient.get(`${FAQ_URL}/${taskId}`, params),
  updateFaq: (task) => AxiosClient.patch(`${FAQ_URL}/${task.id}`, task),
  getAllFaqInGroup: (channelId) => AxiosClient.get(`api/channels/${channelId}/tasks`)
};

export default FaqApi;
