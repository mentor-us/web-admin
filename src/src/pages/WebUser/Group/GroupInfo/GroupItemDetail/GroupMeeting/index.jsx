import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Skeleton,
  Stack,
  styled
} from "@mui/material";

import { useGetGroupMeetings } from "hooks/meeting/queries";

import MeetingItem from "./MeetingItem";

const CustomBottomNavigationAction = styled(BottomNavigationAction)({
  "&.Mui-selected": {
    color: "#1890ff" // Color when selected
  },
  "&:hover": {
    color: "#7ab6ed" // Color on hover
  },
  "&.font-size": {
    fontSize: "4rem" // Font size
  }
});

export default function GroupMeeting() {
  const { channelId } = useParams();
  const { data: meetings, isLoading, isSuccess } = useGetGroupMeetings(channelId);
  const [value, setValue] = useState("now"); // State for selected tab ('now' or 'past')

  // Filter meetings based on tabValue ('now' or 'past')
  const filteredMeetings = meetings
    ? meetings.filter((meeting) => {
        const meetingTime = new Date(meeting.timeStart);
        const now = new Date();
        return value === "now" ? meetingTime >= now : meetingTime < now;
      })
    : [];

  // Sort filtered meetings by start time (descending)
  filteredMeetings.sort((a, b) => new Date(b.timeStart) - new Date(a.timeStart));

  // Determine which message to display when no meetings are available
  let emptyMessage = "";
  if (isSuccess) {
    emptyMessage = value === "now" ? "Chưa có lịch hẹn mới nào" : "Chưa có lịch hẹn";
  }

  return (
    <Box className="border overflow-y-scroll overflow-x-hidden">
      {/* Render Tabs for 'Now' and 'Past' */}

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: "transparent", borderBottom: "1px solid #e0e0e0", height: "45px" }}
      >
        <CustomBottomNavigationAction
          value="now"
          className="!p-0 !m-0"
          showLabel
          label="Sắp tới"
          sx={{ fontWeight: "medium" }}
        />

        <CustomBottomNavigationAction
          value="past"
          className="!p-0 !m-0"
          showLabel
          label="Đã qua"
          sx={{ fontWeight: "medium" }}
        />
      </BottomNavigation>

      {/* Render Meetings or Empty Message based on loading state and filtered meetings */}
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="rounded" height={90} />
          <Skeleton variant="rounded" height={90} />
          <Skeleton variant="rounded" height={90} />
        </Stack>
      ) : (
        <Box className="px-1">
          {filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting) => <MeetingItem key={meeting.id} meeting={meeting} />)
          ) : (
            <Box>
              {isSuccess && (
                <div className="flex mt-4 justify-center text-base items-center">
                  {emptyMessage}
                </div>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
