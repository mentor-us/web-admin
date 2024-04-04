import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { useGetGroupMeetings } from "hooks/meeting/queries";

import MeetingItem from "./MeetingItem";

export default function GroupMeeting() {
  const { channelId } = useParams();
  // const channelId = "65d99d858c91143221a44b99";
  const { data: meetings } = useGetGroupMeetings(channelId);
  return (
    <Box className="border overflow-y-scroll">
      {meetings && meetings.length > 0 ? (
        meetings.map((meeting) => <MeetingItem key={meeting.id} meeting={meeting} />)
      ) : (
        <div className="flex justify-center items-center">Chưa có lịch hẹn</div>
      )}
    </Box>
  );
}
