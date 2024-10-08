import AxiosClient from "./AxiosClient";

const GRADE_URL = "/api/grades";
const GradeApi = {
  createGrades: (grade) => AxiosClient.post(GRADE_URL, grade),
  getAllGrades: (params = {}) =>
    AxiosClient.get(GRADE_URL, {
      params
    }),
  updateGrades: (grade) => AxiosClient.patch(`${GRADE_URL}/${grade.id}`, grade),
  deleteGrade: (gradeId) => AxiosClient.delete(`${GRADE_URL}/${gradeId}`),
  importGrades(file, userId) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    return AxiosClient.post(`api/grades/import/${userId}`, data, config);
  },
  shareGrade: (req) => AxiosClient.post(`${GRADE_URL}/share`, req),
  getShareGradeInfo: (req) => AxiosClient.get(`${GRADE_URL}/share/${req.userId}`, req)
};

export default GradeApi;
