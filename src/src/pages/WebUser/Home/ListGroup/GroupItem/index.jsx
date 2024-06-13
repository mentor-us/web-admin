/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";
import FileApi from "api/FileApi";

import { useGetAllHomeGroupInfinity } from "hooks/groups/queries";

function GroupItem({ group, handleListItemClick, selectedGroupId }) {
  const [isGrHover, setIsGrHover] = useState(false);

  const groupName = (groupData) => {
    const groupNameSplit = groupData?.name
      .trim()
      .split(" ")
      .filter((txt) => txt);
    if (groupNameSplit.length >= 2) {
      return `${groupNameSplit[0][0]}${groupNameSplit[1][0]}`;
    }

    return groupNameSplit[0][0];
  };

  return (
    <div
      onMouseEnter={() => setIsGrHover(true)}
      onMouseLeave={() => setIsGrHover(false)}
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
              <Avatar
                src={getImageUrlWithKey(group.imageUrl)}
                alt="detail-image"
                shadow="xl"
                size="md"
                className={`hover:rounded ${
                  selectedGroupId === group.id || isGrHover ? "!rounded" : ""
                }`}
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
                className={`hover:rounded ${
                  selectedGroupId === group.id || isGrHover ? "!rounded" : ""
                }`}
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
}

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
  selectedGroupId: PropTypes.string.isRequired,
  handleListItemClick: PropTypes.func.isRequired
};

export default GroupItem;
