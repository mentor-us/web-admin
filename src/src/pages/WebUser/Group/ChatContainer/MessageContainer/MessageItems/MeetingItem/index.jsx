/* eslint-disable no-unused-vars */
import { Box, Button, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { ClockIcon } from "assets/svgs";

import MeetingService from "service/meetingService";

function MeetingItem({ meeting }) {
  const meetingData = MeetingService.fulfillMeetingTime(meeting);

  return (
    <Box className="meeting-message-container ">
      <Box className="bg-white rounded-lg w-[70%] p-4">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={1}
        >
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
            <ClockIcon width={22} height={22} />
            <Typography className="text-[#F05B51] !font-bold !text-base">Lịch hẹn</Typography>
          </Box>
          <Tooltip title={meetingData.title}>
            <Typography className="!font-bold !text-xl !text-[#333] line-clamp-2">
              {meetingData.title}
            </Typography>
          </Tooltip>
          <Typography className="!text-lg !text-[#888] line-clamp-2">
            Lúc {meetingData.time.from}, ngày {meetingData.time.date}
          </Typography>
          <Button className="!text-sm !bg-[#ebebeb] !rounded-full !text-[#333] !font-medium">
            Mở lịch
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

MeetingItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  meeting: PropTypes.object.isRequired
};

export default MeetingItem;
