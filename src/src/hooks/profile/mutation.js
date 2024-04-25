import { useMutation } from "@tanstack/react-query";

import AccountService from "service/accountServices";

// eslint-disable-next-line import/prefer-default-export
export const useUpdateProfileMutation = () =>
  useMutation({
    mutationKey: "update-profile",
    mutationFn: (req) => AccountService.updateProfile(req)
  });
