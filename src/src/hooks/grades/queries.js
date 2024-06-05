/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import GradeApi from "api/GradeApi";
import YearApi from "api/YearApi";

import EventService from "service/EventService";

// eslint-disable-next-line import/prefer-default-export
export const useGetAllGrades = (year, semester) =>
  useQuery({
    queryKey: ["grades"],
    queryFn: async () => {
      const res = await GradeApi.getAllGrades(year, semester);
      return res.data;
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
