/* eslint-disable import/prefer-default-export */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import GroupsServices from "service/groupsServices";

import { GetAllHomeGroupInfinityKey, GetWorkspaceQueryKey } from "./keys";

const PAGE_SIZE = 3;

export const useGetAllHomeGroupInfinity = () =>
  useInfiniteQuery({
    queryKey: GetAllHomeGroupInfinityKey,
    queryFn: ({ pageParam }) => {
      return GroupsServices.getGroupsInHomePage("", pageParam, PAGE_SIZE);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.length === PAGE_SIZE ? allPage[0].length / PAGE_SIZE : undefined;
    },
    select(data) {
      return {
        pages: data.pages.flatMap((x) => x),
        pageParams: [...data.pageParams]
      };
    }
  });

export const useGetWorkSpace = (groupId, select) =>
  useQuery({
    queryKey: GetWorkspaceQueryKey(groupId),
    queryFn: () => GroupsServices.getWorkspace(groupId),
    select,
    enabled: !!groupId
  });

export const useGetGroupDetail = (groupId) =>
  useQuery({
    queryKey: ["groupDetail", groupId],
    queryFn: () => GroupsServices.getGroupDetail(groupId),
    enabled: !!groupId
  });
