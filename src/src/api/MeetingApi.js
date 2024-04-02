import AxiosClient from "./AxiosClient";

const urlMeeting = "/api/meetings";
const MeetingApi = {
  createMeeting: (meeting) => AxiosClient.post(urlMeeting, meeting),
  getAllMeetingInGroup: (groupId) => AxiosClient.get(`${urlMeeting}?groupId=${groupId}`)
};

export default MeetingApi;
