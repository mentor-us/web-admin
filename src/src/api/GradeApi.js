import AxiosClient from "./AxiosClient";

const GRADE_URL = "/api/grades";
const GradeApi = {
  createGrades: (grade) => AxiosClient.post(GRADE_URL, grade),
  getAllGrades: (params = {}) =>
    AxiosClient.get(GRADE_URL, {
      params
    }),
  updateGrades: (grade) => AxiosClient.patch(`${GRADE_URL}/${grade.id}`, grade),
  deleteGrade: (gradeId) => AxiosClient.delete(`${GRADE_URL}/${gradeId}`)
};

export default GradeApi;
