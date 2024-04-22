import FaqApi from "api/FaqApi";

const FaqService = {
  createFaq: (faq) => FaqApi.createFaq(faq),
  updateFaq: (faq) => FaqApi.updateFaq(faq),
  getAllFaqInChannel: (groupId) => FaqApi.getAllFaqInGroup(groupId),
  getDetailFaq: (faqId) => FaqApi.getDetailFaq(faqId)
};

export default FaqService;
