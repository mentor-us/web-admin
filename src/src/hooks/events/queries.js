/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import EventService from "service/EventService";

// eslint-disable-next-line import/prefer-default-export
export const useGetAllEvents = () =>
  useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await EventService.getAllEvent();
      if (res.data && res.data.length > 0) {
        let events = res.data;
        events = events.map((event) => {
          return {
            ...event,
            start: new Date(event.timeStart)
          };
        });
        return events;
      }
      return [];
    },
    enabled: true
  });
