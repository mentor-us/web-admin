/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router";
import { ExpandLess } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { GroupIcon } from "assets/svgs";

import AsyncMDAvatar from "pages/WebUser/components/AsyncMDAvatar";
import { useGetGroupMembers } from "hooks/channels/queries";

export default function GroupMember() {
  const { channelId } = useParams();
  const { data: channelMember, isLoading, isSuccess } = useGetGroupMembers(channelId);
  console.log("ttt", channelMember);
  return (
    <div className="overflow-auto">
      <ListItemButton>
        <ListItemText
          disableTypography
          className="text-base font-bold"
          primary="Danh sách thành viên"
        />
      </ListItemButton>

      <Collapse in timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {channelMember?.map((member) => (
            <ListItemButton key={member.id}>
              <ListItemIcon>
                <AsyncMDAvatar
                  src={member.imageUrl}
                  alt="detail-image"
                  shadow="md"
                  size="md"
                  sx={{
                    width: "32px",
                    height: "32px",
                    alignSelf: "center",
                    background: "white",
                    mx: 0,
                    border: "1px solid white",
                    borderRadius: "34px" // Use camelCase for CSS properties
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                className="text-base line-clamp-1"
                primary={member.name}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </div>
  );
}
