import { useMutation, useQueryClient } from "@tanstack/react-query";

import GradeApi from "api/GradeApi";

export const useCreateGradeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-grade"],
    mutationFn: (grade) => GradeApi.createGrades(grade),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["grades"]
      });
    }
  });
};
export const useUpdateGradeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-grade"],
    mutationFn: (grade) => GradeApi.updateGrades(grade),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["grades"]
      });
    }
  });
};

export const useDeleteGradeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-grade"],
    mutationFn: (grade) => GradeApi.deleteGrade(grade?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["grades"]
      });
    }
  });
};
