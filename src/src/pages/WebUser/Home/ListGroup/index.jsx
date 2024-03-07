import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";

import MDAvatar from "components/MDComponents/MDAvatar";

const groupExample = [
  {
    id: "string",
    name: "Mentee",
    imageUrl: "https://www.womeninhvacr.org/wahelper/GetImage?id=415873"
  },
  {
    id: "string",
    name: "Mentor",
    imageUrl: "https://kle.edu.vn/wp-content/uploads/2022/07/1-8.jpg"
  },
  {
    id: "string",
    name: "Mobile",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/191.png"
  }
];
export default function ListGroup() {
  return (
    <div>
      {groupExample.map((group) => {
        return (
          <div className="flex justify-center items-center h-16 text-white hover:bg-sky-700">
            <NavLink to="group/1">
              <Tooltip title={group.name}>
                <Button>
                  <MDAvatar
                    src={group.imageUrl}
                    alt="detail-image"
                    shadow="xl"
                    size="sm"
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
