import AxiosClient from "./AxiosClient";

const FAQ_URL = "/api/faqs";

const FaqApi = {
  createFaq: (faq) => AxiosClient.post(FAQ_URL, faq),
  getDetailFaq: (faqId) => AxiosClient.get(`${FAQ_URL}/${faqId}`),
  updateFaq: (faq) => AxiosClient.patch(`${FAQ_URL}/${faq.id}`, faq),
  getAllFaqInGroup: (grouptId) => AxiosClient.get(`${FAQ_URL}`, { params: { groupId: grouptId } })
};

export default FaqApi;
