import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyInfo, selectMyInfo } from "features/myInfo/slice";

export default function useMyInfo() {
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const myInfo = useSelector(selectMyInfo);

  useEffect(() => {
    if (token && Object.keys(myInfo).length === 0) {
      dispatch(getMyInfo());
    }
  }, [myInfo]);

  return myInfo;
}
