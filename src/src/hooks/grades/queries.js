/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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
export const useGetAllGrades = (year, semester, userId) =>
  useQuery({
    queryKey: ["grades", year?.id, semester?.id],
    queryFn: async () => {
      try {
        // console.log(year?.id, semester?.id, userId);
        return gradesList;
        // const dataReq = {
        //   parmas: {
        //     yearId: year?.id,
        //     semesterId: semester?.id,
        //     userId
        //   }
        // };
        // const res = await GradeApi.getAllGrades(dataReq);
        // return res.data;
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
        const res = await YearApi.getAllYears();
        console.log("useGetAllYears");
        console.log(res.data);
        return years;
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
        return semesters;
        // const res = await YearApi.getAllSemesterOfYear(year?.id);
        // return res.data;
      } catch (error) {
        return semesters;
      }
    },
    enabled: true
  });
export const getAllCourse = (name) =>
  useQuery({
    queryKey: ["course", name],
    queryFn: async () => {
      try {
        return courses;
        // const res = await YearApi.getAllSemesterOfYear(year?.id);
        // return res.data;
      } catch (error) {
        return courses;
      }
    },
    enabled: true
  });