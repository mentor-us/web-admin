import React, { useState } from "react"; // Import useState
import { Box } from "@mui/material";
import PropTypes from "prop-types";

import BookMeetingDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/BookMeetingIconButton/BookMeetingDialog";
import { getTimeMeeting } from "utils/formatDate";

function MeetingItem({ meeting }) {
  const formateMeeting = {
    ...meeting,
    time: getTimeMeeting(meeting?.timeStart || "", meeting?.timeEnd || "")
  };
  const [openDialogMeeting, setOpenDialogMeeting] = useState(false);

  return (
    <Box className="!px-2 ">
      <Box
        onClick={() => {
          setOpenDialogMeeting(true);
        }}
        className="w-full max-w-screen-md hover:!shadow-lg !border-solid border-2 my-0.5 gap-1 rounded-xl p-2 pt-10 relative hover:cursor-pointer"
      >
        <Box className="bg-blue-500 absolute top-0 right-0 px-2 py-2 rounded-tr-xl rounded-bl-xl">
          {/* <p className="text-white  text-xs text-center">{formateMeeting?.time?.display}</p> */}
          <p className="text-white  text-xs text-center">Lịch hẹn</p>
        </Box>
        <Box className="absolute top-0.5 left-0 px-3 py-2  rounded-r-md">
          <p className="text-black text-base">{formateMeeting?.title}</p>
        </Box>
        <p className="text-gray-500 text-sm">{formateMeeting?.time?.display}</p>
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
