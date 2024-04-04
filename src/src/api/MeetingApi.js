import AxiosClient from "./AxiosClient";

const MEETING_URL = "/api/meetings";
const MeetingApi = {
  createMeeting: (meeting) => AxiosClient.post("/api/meetings", meeting),
  getDetailMeeting: (meetingId, params = {}) =>
    AxiosClient.get(`${MEETING_URL}/${meetingId}`, params)
};

export default MeetingApi;
