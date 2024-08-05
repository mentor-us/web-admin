/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { ClockIcon } from "assets/svgs";

import MeetingService from "service/meetingService";

import BookMeetingDialog from "../../../TextEditor/EditorToolbar/BookMeetingIconButton/BookMeetingDialog";

function MeetingItem({ meeting }) {
  const meetingData = MeetingService.fulfillMeetingTime(meeting);
  const [openDialogMeeting, setOpenDialogMeeting] = useState(false);

  return (
    <Box className="meeting-message-container">
      <Box className="bg-white rounded-lg p-4 !min-w-[70%] !max-w-[70%]">
        <Box display="flex" justifyContent="center" flexDirection="column" gap={1}>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
            <ClockIcon width={22} height={22} />
            <Typography className="text-[#F05B51] !font-bold !text-lg">Lịch hẹn</Typography>
          </Box>
          <Box className="text-center break-words !max-w-[70%] self-center">
            <Typography className="!font-bold !text-base !text-[#333] !line-clamp-1 !flex-wrap">
              <Tooltip title={meetingData.title}>{meetingData.title}</Tooltip>
            </Typography>
          </Box>
          <Typography className="!text-sm !text-[#888] !line-clamp-1 self-center">
            Lúc {meetingData.time.from}, ngày {meetingData.time.date}
          </Typography>
          <Box className="self-center">
            <Button
              className="!text-xs !bg-[#ebebeb] !rounded-full !text-[#333]"
              onClick={() => setOpenDialogMeeting(true)}
            >
              Mở lịch
            </Button>
          </Box>
        </Box>
      </Box>
      {openDialogMeeting && (
        <BookMeetingDialog
          open={openDialogMeeting}
          handleClose={() => setOpenDialogMeeting(false)}
          meetingId={meetingData.id}
        />
      )}
    </Box>
  );
}

MeetingItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  meeting: PropTypes.object.isRequired
};

export default MeetingItem;
