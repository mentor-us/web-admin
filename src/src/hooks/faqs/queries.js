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
