import AxiosClient from "./AxiosClient";

const MEETING_URL = "/api/meetings";
const MeetingApi = {
  createMeeting: (meeting) => AxiosClient.post("/api/meetings", meeting),
  getDetailMeeting: (meetingId, params = {}) =>
    AxiosClient.get(`${MEETING_URL}/${meetingId}`, params),
  getMeetingAssignees: (meetingId, params = {}) =>
    AxiosClient.get(`${MEETING_URL}/${meetingId}/attendees`, params),
  updateMeeting: (meeting) => AxiosClient.patch(`${MEETING_URL}/${meeting.id}`, meeting),
  getAllMeetingInChannel: (groupId) => AxiosClient.get(`api/channels/${groupId}/meetings`)
};

export default MeetingApi;
