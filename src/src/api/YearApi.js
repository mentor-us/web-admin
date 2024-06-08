import AxiosClient from "./AxiosClient";

const YEAR_URL = "/api/years";
const YearApi = {
  getAllYears: () => AxiosClient.get(YEAR_URL),
  getAllSemesterOfYear: () => AxiosClient.get(`/api/semester`)
};

export default YearApi;
