/* eslint-disable no-unused-vars */
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useGetAllHomeGroupInfinity } from "hooks/groups/queries";

import GroupItem from "./GroupItem";

export default function ListGroup() {
  const { data: paginationList, isSuccess, isLoading } = useGetAllHomeGroupInfinity();
  const [selectedGroupId, setSelectedGroupId] = useState("");

  const handleListItemClick = (groupId) => {
    setSelectedGroupId(groupId);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div id="scrollableDiv" className="scroll-auto max-w-16 h-full">
      {isSuccess &&
        paginationList.pages.map((group) => {
          return (
            <GroupItem
              key={group.id}
              group={group}
              selectedGroupId={selectedGroupId}
              handleListItemClick={handleListItemClick}
            />
          );
        })}
    </div>
  );
}
