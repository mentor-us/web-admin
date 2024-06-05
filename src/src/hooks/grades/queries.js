/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import GradeApi from "api/GradeApi";
import YearApi from "api/YearApi";

import EventService from "service/EventService";

const gradesList = [
  {
    id: 1,
    name: "Thiết kế phần mềm",
    score: 10,
    verified: true
  },
  {
    id: 2,
    name: "Thiết kế web 3",
    score: 5,
    verified: true
  },
  {
    id: 3,
    name: "Thiết kế giao dien",
    score: 7,
    verified: false
  }
];

// eslint-disable-next-line import/prefer-default-export
export const useGetAllGrades = (year, semester) =>
  useQuery({
    queryKey: ["grades", year, semester],
    queryFn: async () => {
      try {
        console.log(year, semester);
        return gradesList;
        // const dataReq = {
        //   parmas: {
        //     year,
        //     semester
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
export const useGetAllYears = () =>
  useQuery({
    queryKey: ["years"],
    queryFn: async () => {
      try {
        const res = await YearApi.getAllYears();
        return res.data;
      } catch (error) {
        return ["2024", "2023", "2022", "2021"];
      }
    },
    enabled: true
  });
export const getAllSemesterOfYear = (year) =>
  useQuery({
    queryKey: ["years/semester", year],
    queryFn: async () => {
      try {
        const res = await YearApi.getAllSemesterOfYear(year);
        return res.data;
      } catch (error) {
        return ["HK1", "HK2", "HK3222"];
      }
    },
    enabled: true
  });
