/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import CourseApi from "api/CourseApi";
import GradeApi from "api/GradeApi";
import YearApi from "api/YearApi";

const years = [
  { id: 1, name: "2023-2024" },
  { id: 2, name: "2022-2023" },
  { id: 3, name: "2021-2022" },
  { id: 4, name: "2020-2021" }
];

const semesters = [
  { id: 1, name: "HK1", year: years[1] },
  { id: 2, name: "HK2", year: years[2] },
  { id: 3, name: "HK3", year: years[3] },
  { id: 4, name: "HK4", year: years[4] }
];

const courses = [
  {
    id: 1,
    name: "Thiết kế phần mềm"
  },
  {
    id: 2,
    name: "Lap Trinh phần mềm"
  },
  {
    id: 3,
    name: "Lap Trinh web"
  },
  {
    id: 4,
    name: "Lap Trinh mobile"
  }
];

const gradesList = [
  {
    id: 1,
    course: courses[0],
    score: 10,
    verified: true,
    creator: {
      id: 222,
      name: "Thong"
    },
    Semester: semesters[0]
  },
  {
    id: 2,
    course: courses[1],
    score: 8,
    verified: false,
    creator: {
      id: 222,
      name: "Thong"
    },
    Semester: semesters[1]
  },
  {
    id: 3,
    course: courses[2],
    score: 5,
    verified: true,
    creator: {
      id: 333,
      name: "Thong"
    },
    Semester: semesters[2]
  }
];
const shareGradeInfo = {
  userId: "b7a6a7de-ffbf-438f-a784-129c6cbf0fb3",
  shareType: "PUBLIC",
  userAccesses: [
    {
      accessType: {
        label: "Xem",
        key: "VIEW"
      },
      email: "20127665@student.hcmus.edu.vn",
      id: "1b1d91e6-5994-4961-ac7b-a044bee73712",
      imageUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocJKO74-RTPo1PyvdwZtEJzfxdEVWpx9Tj_ZUoC7ha9zJ_DN-8Pw=s96-c",
      name: "20127665 - Dương Quang Vinh"
    }
  ]
};
// eslint-disable-next-line import/prefer-default-export
export const useGetAllGrades = (query) =>
  useQuery({
    queryKey: ["grades"],
    queryFn: async () => {
      try {
        const params = {
          page: 0,
          pageSize: 10,
          userId: null
        };
        const res = await GradeApi.getAllGrades({ ...params, ...query });

        // eslint-disable-next-line no-inner-declarations
        function compare(a, b) {
          if (a.score < b.score) {
            return -1;
          }
          if (a.score > b.score) {
            return 1;
          }
          return 0;
        }
        // const formatData = [...res.data].map((grade) => {
        //   return {
        //     ...grade,
        //     year: grade?.year?.name,
        //     semester: grade?.semester?.name,
        //     courseName: grade?.course?.name,
        //     courseCode: grade?.course?.code
        //   };
        // });
        return { ...res };
      } catch (error) {
        return gradesList;
      }
    },
    enabled: true
  });
export const useGetAllYears = (yearInfo) =>
  useQuery({
    queryKey: ["years", yearInfo],
    queryFn: async () => {
      try {
        const params = {
          pageSize: 999
        };
        // const res = await YearApi.getAllYears(params);
        const gradeRes = await GradeApi.getAllGrades({ ...params });
        // const formatData = [...gradeRes.data].map((grade) => {
        //   return {
        //     ...grade,
        //     year: grade?.year?.name,
        //     semester: grade?.semester?.name,
        //     courseName: grade?.course?.name,
        //     courseCode: grade?.course?.code
        //   };
        // });
        const yearFormat = [...gradeRes.data].map((grade) => {
          return grade.year;
        });
        const uniqueYear = yearFormat.filter(
          (value, index, array) => array.indexOf(value) === index
        );
        return uniqueYear;
        // return res.data;
        // eslint-disable-next-line no-unreachable
      } catch (error) {
        return years;
      }
    },
    enabled: true
  });
export const getAllSemesterOfYear = (semesterInfo) =>
  useQuery({
    queryKey: ["years/semester", semesterInfo],
    queryFn: async () => {
      try {
        const params = {
          pageSize: 999
        };
        // const res = await YearApi.getAllYears(params);
        const gradeRes = await GradeApi.getAllGrades({ ...params });
        // const formatData = [...gradeRes.data].map((grade) => {
        //   return {
        //     ...grade,
        //     year: grade?.year?.name,
        //     semester: grade?.semester?.name,
        //     courseName: grade?.course?.name,
        //     courseCode: grade?.course?.code
        //   };
        // });
        const semesterFormat = [...gradeRes.data].map((grade) => {
          return grade.semester;
        });
        const uniqueSemester = semesterFormat.filter(
          (value, index, array) => value && array.indexOf(value) === index
        );
        return uniqueSemester;
      } catch (error) {
        return semesters;
      }
    },
    enabled: true
  });
export const getAllCourse = (query) =>
  useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      try {
        // return courses;
        const params = {
          page: 0,
          pageSize: 99
        };
        const res = await CourseApi.getAllCourses({ ...params, ...query });

        return res;
      } catch (error) {
        return courses;
      }
    },
    enabled: true
  });
export const useGetShareGradeInfo = (user) =>
  useQuery({
    queryKey: ["share-grade-info"],
    queryFn: async () => {
      try {
        const res = await GradeApi.getShareGradeInfo({
          userId: user?.id
        });
        return res;
      } catch (error) {
        return {};
      }
    },
    enabled: true
  });
