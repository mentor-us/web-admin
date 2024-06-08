import AxiosClient from "./AxiosClient";

const YEAR_URL = "/api/years";
const YearApi = {
  getAllYears: () => AxiosClient.get(YEAR_URL),
  getAllSemesterOfYear: (yearId) => AxiosClient.get(`${YEAR_URL}/${yearId}/semester`)
};

export default YearApi;
