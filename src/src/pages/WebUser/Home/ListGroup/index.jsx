import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";

import MDAvatar from "components/MDComponents/MDAvatar";

const groupExample = [
  {
    id: "1",
    name: "Mentee",
    imageUrl: "https://www.womeninhvacr.org/wahelper/GetImage?id=415873"
  },
  {
    id: "2",
    name: "Mentor",
    imageUrl: "https://kle.edu.vn/wp-content/uploads/2022/07/1-8.jpg"
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
  return (
    <div className="scroll-auto max-w-16">
      {groupExample.map((group) => {
        return (
          <div className="group_thumball flex justify-center items-center max-w-16 h-16 text-white hover:bg-sky-700">
            <NavLink to={`group/${group.id}`}>
              <Tooltip title={group.name}>
                <Button>
                  <MDAvatar
                    src={group.imageUrl}
                    alt="detail-image"
                    shadow="xl"
                    size="sm"
                    className="hover:rounded"
                    sx={{
                      alignSelf: "center",
                      background: "lightgray",
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
