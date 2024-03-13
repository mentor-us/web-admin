/* eslint-disable no-unused-vars */
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";

import FileApi from "api/FileApi";

import { useGetAllHomeGroupInfinity } from "hooks/groups/queries";

import AsyncMDAvatar from "../../components/AsyncMDAvatar";

const groupExample = [
  {
    id: "1",
    name: "Mentee",
    imageUrl: "https://www.womeninhvacr.org/wahelper/GetImage?id=415873"
  },
  {
    id: "2",
    name: "Mobile",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/191.png"
  },
  {
    id: "3",
    name: "Mentee",
    imageUrl: "https://www.womeninhvacr.org/wahelper/GetImage?id=415873"
  },
  {
    id: "4",
    name: "Mentor",
    imageUrl: "https://kle.edu.vn/wp-content/uploads/2022/07/1-8.jpg"
  },
  {
    id: "5",
    name: "Mobile",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/191.png"
  },
  {
    id: "6",
    name: "Mentee",
    imageUrl: "https://www.womeninhvacr.org/wahelper/GetImage?id=415873"
  },
  {
    id: "7",
    name: "Mentor",
    imageUrl: "https://kle.edu.vn/wp-content/uploads/2022/07/1-8.jpg"
  },
  {
    id: "8",
    name: "Mobile",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/191.png"
  },
  {
    id: "9",
    name: "Mentee",
    imageUrl: "https://www.womeninhvacr.org/wahelper/GetImage?id=415873"
  },
  {
    id: "10",
    name: "Mentor",
    imageUrl: "https://kle.edu.vn/wp-content/uploads/2022/07/1-8.jpg"
  },
  {
    id: "11",
    name: "Mobile",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/191.png"
  },
  {
    id: "12",
    name: "Mentee",
    imageUrl: "https://www.womeninhvacr.org/wahelper/GetImage?id=415873"
  },
  {
    id: "13",
    name: "Mentor",
    imageUrl: "https://kle.edu.vn/wp-content/uploads/2022/07/1-8.jpg"
  },
  {
    id: "14",
    name: "Mobile",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/191.png"
  }
];

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

  return (
    <div id="scrollableDiv" className="scroll-auto max-w-16 h-full">
      {isSuccess &&
        paginationList.pages.map((group) => {
          console.log(selectedGroupId === group.id);
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
                  </Button>
                </Tooltip>
              </NavLink>
            </div>
          );
        })}
    </div>
  );
}
