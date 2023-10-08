/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isEmptyObject } from "utils";

import { getMyInfo, selectMyInfo } from "redux/myInfo/slice";

export default function useMyInfo() {
  const dispatch = useDispatch();
  const myInfo = useSelector(selectMyInfo);

  useEffect(() => {
    if (isEmptyObject(myInfo)) {
      dispatch(getMyInfo());
    }
  }, [myInfo]);

  return myInfo;
}
