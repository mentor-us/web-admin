/* eslint-disable import/prefer-default-export */
import { useQuery, useQueryClient } from "@tanstack/react-query";

import accountServices from "service/accountServices";

import { useGetMenteeKey } from "./key";

export const useGetMentees = (req) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: useGetMenteeKey(req),
    queryFn: () => accountServices.getMentees(req),
    onSuccess: (data) => {
      queryClient.setQueryData(["mentees", req], data);
    }
  });
};
