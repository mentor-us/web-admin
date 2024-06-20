import AxiosClient from "./AxiosClient";

const COURSE_URL = "/api/courses";
const CourseApi = {
  getAllCourses: (params) => AxiosClient.get(COURSE_URL, { params }),
  createCourses: (course) => AxiosClient.post(COURSE_URL, course),
  updateCourses: (course) => AxiosClient.patch(`${COURSE_URL}/${course.id}`, course),
  deleteCourses: (course) => AxiosClient.delete(`${COURSE_URL}/${course.id}`)
};

export default CourseApi;
