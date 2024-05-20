import { useState } from "react";
import { useParams } from "react-router";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import UserApi from "api/UserApi";

import AsyncMDAvatar from "pages/WebUser/components/AsyncMDAvatar";
import ProfileDialog from "pages/WebUser/components/ProfileDialog";
import { useGetChannelMembers } from "hooks/channels/queries";

export default function GroupMember() {
  const { channelId } = useParams();
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const { data: channelMember } = useGetChannelMembers(channelId);

  const handleProfileOpen = () => {
    setOpenProfile(true);
  };
  const handleProfileClose = () => {
    setOpenProfile(false);
  };
  return (
    <div className="overflow-auto">
      <Collapse in timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {channelMember?.map((member) => (
            <ListItemButton
              key={member.id}
              onClick={async () => {
                const res = await UserApi.findById(member.id);
                if (res) {
                  setSelectedMember(res);
                  handleProfileOpen();
                }
              }}
            >
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
          {openProfile && (
            <ProfileDialog
              open={openProfile}
              onClose={handleProfileClose}
              user={selectedMember}
              isFromGroupMember
            />
          )}
        </List>
      </Collapse>
    </div>
  );
}
