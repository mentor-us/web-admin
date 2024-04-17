import AxiosClient from "./AxiosClient";

const EventApi = {
  async getSchedulesData(params = {}) {
    const URL = `/api/events/own`;
    const data = await AxiosClient.get(URL, {
      params
    });
    return data;
  }
};
export default EventApi;
