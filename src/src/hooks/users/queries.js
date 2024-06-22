/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";

import UserApi from "api/UserApi";

// eslint-disable-next-line import/prefer-default-export
export const useGetAllUsers = (query) =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await UserApi.getAllUser();
        // res.filters((user) => user?.email?.includes(query));
        return res;
      } catch (error) {
        return [];
      }
    },
    enabled: !!query
  });
