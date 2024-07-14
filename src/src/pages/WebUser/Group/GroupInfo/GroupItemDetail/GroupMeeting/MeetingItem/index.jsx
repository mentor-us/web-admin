import React, { useState } from "react"; // Import useState
import { Box, Stack } from "@mui/material";
import PropTypes from "prop-types";

import BookMeetingDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/BookMeetingIconButton/BookMeetingDialog";
import TooltipCustom from "components/Tooltip";
import { getTimeMeeting } from "utils/formatDate";

// p-2 pt-10
function MeetingItem({ meeting }) {
  const formateMeeting = {
    ...meeting,
    time: getTimeMeeting(meeting?.timeStart || "", meeting?.timeEnd || "")
  };
  const [openDialogMeeting, setOpenDialogMeeting] = useState(false);

  return (
    <Box className="">
      <Box
        onClick={() => {
          setOpenDialogMeeting(true);
        }}
        className="w-full hover:!shadow-lg !border-solid border-2 my-0.5 gap-1 rounded-xl hover:cursor-pointer pb-2 mb-2"
      >
        <Stack direction="row" gap={1}>
          <TooltipCustom title={formateMeeting?.title}>
            <Box className="pl-2 mt-2 !text-black !text-base !line-clamp-1 !flex-1">
              <span className="mt-2">{formateMeeting?.title}</span>
            </Box>
          </TooltipCustom>

          <Box className="bg-blue-500 rounded-tr-xl rounded-bl-xl px-2">
            <span className="!text-white !text-xs !text-center">Lịch hẹn</span>
          </Box>
        </Stack>
        <TooltipCustom title={`Thời gian diễn ra: ${formateMeeting?.time?.display}`}>
          <Box>
            <p className="pl-2 text-gray-500 text-sm">{formateMeeting?.time?.display}</p>
          </Box>
        </TooltipCustom>
      </Box>
      {openDialogMeeting && (
        <BookMeetingDialog
          open={openDialogMeeting}
          handleClose={() => setOpenDialogMeeting(false)}
          meetingId={formateMeeting.id} // I assume msgIdDialog is defined somewhere
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
