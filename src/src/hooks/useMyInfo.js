/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyInfo, selectMyInfo } from "features/myInfo/slice";

import { isEmptyObject } from "utils";

export default function useMyInfo() {
  const dispatch = useDispatch();
  const myInfo = useSelector(selectMyInfo);

  useEffect(() => {
    if (isEmptyObject(myInfo)) {
      dispatch(getMyInfo());
      console.log("DISPATCH INFO");
    }
  }, [myInfo]);

  return myInfo;
}
