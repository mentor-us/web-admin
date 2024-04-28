/* eslint-disable import/prefer-default-export */
const selectMyInfo = (state) => state.myInfo.data;
const selectMyInfoState = (state) => state.myInfo;
export { selectMyInfo, selectMyInfoState };
