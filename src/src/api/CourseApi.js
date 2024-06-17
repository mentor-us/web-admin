import AxiosClient from "./AxiosClient";

const COURSE_URL = "/api/courses";
const CourseApi = {
  getAllCourses: (params) => AxiosClient.get(COURSE_URL, { params })
};

export default CourseApi;
