import AxiosClient from "./AxiosClient";

const MeetingApi = {
  createMeeting: (meeting) => AxiosClient.post("/api/meetings", meeting)
};

export default MeetingApi;
