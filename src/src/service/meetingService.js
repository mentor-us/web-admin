import { getTimeMeeting } from "utils";

const MeetingService = {
  fulfillMeetingTime: (meeting) => {
    return {
      ...meeting,
      time: getTimeMeeting(meeting?.timeStart || "", meeting?.timeEnd || ""),
      organizer: {
        name: "System"
      }
    };
  }
};

export default MeetingService;
