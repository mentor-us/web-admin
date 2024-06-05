import { useMutation, useQueryClient } from "@tanstack/react-query";

import GradeApi from "api/GradeApi";

export const useCreateGradeMutation = (year, semester) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-grade"],
    mutationFn: (grade) => GradeApi.createGrades(grade),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["grades", year, semester]
      });
    }
  });
};
export const useUpdateGradeMutation = (year, semester) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-grade"],
    mutationFn: (grade) => GradeApi.updateGrades(grade),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["grades", year, semester]
      });
    }
  });
};

export const useDeleteGradeMutation = (year, semester) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-grade"],
    mutationFn: (gradeId) => GradeApi.deleteGrade(gradeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["grades", year, semester]
      });
    }
  });
};
