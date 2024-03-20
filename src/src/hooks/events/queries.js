/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import EventService from "service/EventService";

// eslint-disable-next-line import/prefer-default-export
export const useGetAllEvents = () =>
  useQuery({
    queryKey: ["events"],
    queryFn: () => EventService.getAllEvent(),
    enabled: true
  });
