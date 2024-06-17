import AxiosClient from "./AxiosClient";

const YEAR_URL = "/api/years";
const YearApi = {
  getAllYears: (params) => AxiosClient.get(YEAR_URL, { params }),
  getAllSemesterOfYear: () => AxiosClient.get(`/api/semester`)
};

export default YearApi;
