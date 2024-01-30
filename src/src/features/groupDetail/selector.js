export const getGroupDetail = (state) => state.groupDetail.data;
export const getGroupsMentorSelectAllSelector = (state) => state.groupDetail.isSelectMentorAll;
export const getGroupsMenteeSelectAllSelector = (state) => state.groupDetail.isSelectMenteeAll;
export const getMenteesSelector = (state) => state.groupDetail.mentees;
export const getMentorsSelector = (state) => state.groupDetail.mentors;

export const getGroupDetailColumnHeadersMenteeSelector = (state) =>
  state.groupDetail.columnHeadersMentee;
export const getGroupDetailColumnHeadersMentorSelector = (state) =>
  state.groupDetail.columnHeadersMentor;
