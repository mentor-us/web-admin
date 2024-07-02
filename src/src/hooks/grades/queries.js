/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import CourseApi from "api/CourseApi";
import GradeApi from "api/GradeApi";
import YearApi from "api/YearApi";

import EventService from "service/EventService";

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
        return { ...res, data: [...res.data].sort(compare) };
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
        // const params = {
        //   yearInfo
        // };
        const res = await YearApi.getAllYears();
        // console.log("useGetAllYears");
        // console.log(res.data);
        // [...res.data].filter((year) => year.name.toString().includes(yearInfo));
        return res.data;
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
        const res = await YearApi.getAllSemesterOfYear({
          query: semesterInfo
        });
        return res.data;
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
          pageSize: 10
        };
        const res = await CourseApi.getAllCourses({ ...params, ...query });

        return res;
      } catch (error) {
        return courses;
      }
    },
    enabled: true
  });
