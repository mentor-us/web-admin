import AxiosClient from "./AxiosClient";

const YEAR_URL = "/api/years";
const YearApi = {
  getAllYears: () => AxiosClient.get(YEAR_URL),
  getAllSemesterOfYear: (year) => AxiosClient.get(`${YEAR_URL}/${year}/semester`)
};

export default YearApi;
