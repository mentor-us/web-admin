import AxiosClient from "./AxiosClient";

const YEAR_URL = "/api/years";
const YearApi = {
  getAllYears: (params) => AxiosClient.get(YEAR_URL, { params }),
  getAllSemesterOfYear: (params) => AxiosClient.get(`/api/semesters`, { params })
};

export default YearApi;
