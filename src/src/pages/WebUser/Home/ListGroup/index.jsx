/* eslint-disable no-unused-vars */
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Tooltip } from "@mui/material";

import FileApi from "api/FileApi";

import { useGetAllHomeGroupInfinity } from "hooks/groups/queries";

import AsyncMDAvatar from "../../components/AsyncMDAvatar";

export default function ListGroup() {
  const {
    data: paginationList,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isLoading
  } = useGetAllHomeGroupInfinity();
  const [selectedGroupId, setSelectedGroupId] = useState("");

  const handleListItemClick = (groupId) => {
    setSelectedGroupId(groupId);
  };

  if (isLoading) {
    return null;
  }

  const groupName = (group) => {
    const groupNameSplit = group?.name
      .trim()
      .split(" ")
      .filter((txt) => txt);
    if (groupNameSplit.length >= 2) {
      return `${groupNameSplit[0][0]}${groupNameSplit[1][0]}`;
    }

    return groupNameSplit[0][0];
  };

  return (
    <div id="scrollableDiv" className="scroll-auto max-w-16 h-full">
      {isSuccess &&
        paginationList.pages.map((group) => {
          return (
            <div
              key={group.id}
              className="group_thumball flex justify-center items-center max-w-16 h-16 text-white hover:bg-sky-600"
            >
              <NavLink
                to={`group/${group.id}`}
                onClick={() => {
                  handleListItemClick(group.id);
                }}
                className={({ isActive }) => (isActive ? "bg-sky-600" : "")}
              >
                <Tooltip title={group.name} placement="right">
                  <Button>
                    {group.imageUrl ? (
                      <AsyncMDAvatar
                        src={group.imageUrl}
                        alt="detail-image"
                        shadow="xl"
                        size="md"
                        className={`hover:rounded ${selectedGroupId === group.id ? "rounded" : ""}`}
                        sx={{
                          alignSelf: "center",
                          background: "#abcdff;",
                          mx: 0
                        }}
                      />
                    ) : (
                      <Avatar
                        shadow="xl"
                        size="lg"
                        className={`hover:rounded ${selectedGroupId === group.id ? "rounded" : ""}`}
                        sx={{
                          alignSelf: "center",
                          background: "#abcdff",
                          width: 48,
                          height: 48,
                          mx: 0
                        }}
                      >
                        {groupName(group)}
                      </Avatar>
                    )}
                  </Button>
                </Tooltip>
              </NavLink>
            </div>
          );
        })}
    </div>
  );
}
