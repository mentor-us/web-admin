import { getTimeMeeting } from "utils";
import MeetingApi from "api/MeetingApi";

const MeetingService = {
  createMeeting: (meeting) => {
    return MeetingApi.createMeeting(meeting);
  },
  updateMeeting: (meeting) => {
    return MeetingApi.updateMeeting(meeting);
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
  getAllMeetingInChannel: (groupId) => {
    return MeetingApi.getAllMeetingInChannel(groupId);
  }
};

export default MeetingService;
