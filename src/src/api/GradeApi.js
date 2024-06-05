import AxiosClient from "./AxiosClient";

const GRADE_URL = "/api/grades";
const GradeApi = {
  createGrades: (grade) => AxiosClient.post(GRADE_URL, grade),
  getAllGrades: (parmas = {}) => AxiosClient.get(GRADE_URL, parmas),
  updateGrades: (grade) => AxiosClient.patch(`${GRADE_URL}/${grade.id}`, grade)
};

export default GradeApi;
