import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectMyInfoState } from "features/myInfo/selector";

import { isAuthenticated } from "utils";

import { ROLE, ROUTE_URL } from "utils/constants";

import useMyInfo from "./useMyInfo";

export default function useAutoLogin() {
  const navigate = useNavigate();
  const myInfo = useMyInfo();
  const myInfoState = useSelector(selectMyInfoState);

  if (isAuthenticated()) {
    if (myInfoState.status === "idle") {
      return null;
    }

    if (Object.keys(myInfo).length !== 0) {
      const { roles } = myInfo;
      if (roles.includes(ROLE.SUPER_ADMIN) || roles.includes(ROLE.ADMIN)) {
        navigate(ROUTE_URL.GROUP_ROOT, {
          replace: true
        });
        return null;
      }

      navigate(ROUTE_URL.CHAT_ROOT, {
        replace: true
      });
    }
  }

  return null;
}
