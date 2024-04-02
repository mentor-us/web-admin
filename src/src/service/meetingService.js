import { getTimeMeeting } from "utils";
import MeetingApi from "api/MeetingApi";

const MeetingService = {
  createMeeting: (meeting) => {
    return MeetingApi.createMeeting(meeting);
  },
  fulfillMeetingTime: (meeting) => {
    return {
      ...meeting,
      time: getTimeMeeting(meeting?.timeStart || "", meeting?.timeEnd || ""),
      organizer: {
        name: "System"
      }
    };
  },
  getAllMeetingInGroup: (groupId) => {
    return MeetingApi.getAllMeetingInGroup(groupId);
  }
};

export default MeetingService;
