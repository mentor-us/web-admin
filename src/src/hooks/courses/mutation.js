import { useMutation, useQueryClient } from "@tanstack/react-query";

import CourseApi from "api/CourseApi";

// eslint-disable-next-line import/prefer-default-export
export const useCreateCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-course"],
    mutationFn: (grade) => CourseApi.createCourses(grade),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"]
      });
    }
  });
};
export const useUpdateCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-course"],
    mutationFn: (course) => CourseApi.updateCourses(course),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"]
      });
    }
  });
};
export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-course"],
    mutationFn: (course) => CourseApi.deleteCourses(course),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"]
      });
    }
  });
};
