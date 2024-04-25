/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";

import FaqService from "service/faqService";

import { GetAllFaqInGroupKey } from "./keys";

// eslint-disable-next-line import/prefer-default-export
export const useGetGroupFaqs = (groupId, select) =>
  useQuery({
    queryKey: GetAllFaqInGroupKey(groupId),
    queryFn: () => FaqService.getAllFaqInChannel(groupId),
    enabled: !!groupId,
    select
  });
export const useGetFaq = (faqId) =>
  useQuery({
    queryKey: ["faq", faqId],
    queryFn: async () => {
      if (!faqId) return null;
      const res = await FaqService.getDetailFaq(faqId);
      return res;
    },
    enabled: true
  });
