import { Box } from "@mui/material";
import PropTypes from "prop-types";

import { getTimeMeeting } from "utils/formatDate";

function MeetingItem({ meeting }) {
  const formatedMeeting = {
    ...meeting,
    time: getTimeMeeting(meeting?.timeStart || "", meeting?.timeEnd || "")
  };
  return (
    <Box className="w-full max-w-screen-md shadow-md my-1 p-3 pt-10 relative hover:cursor-pointer">
      <Box className="bg-blue-500 absolute top-1 right-0 px-2 py-2 ">
        <p className="text-white  text-xs text-center">{formatedMeeting?.time?.display}</p>
      </Box>
      <Box className="absolute top-1 left-0 px-2 py-2 border-l-4 border-blue-500 rounded-r-md">
        <p className="text-blue-500 text-sm font-bold">Lịch hẹn</p>
      </Box>
      <p className="text-black text-xl">{formatedMeeting?.title}</p>
      <p className="text-gray-500 text-sm">Người tổ chức: {formatedMeeting?.organizer?.name} </p>
    </Box>
  );
}

MeetingItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  meeting: PropTypes.object.isRequired
};

export default MeetingItem;
