import PropTypes from "prop-types";

import { GROUP_FUNCTION } from "utils/constants";

import GroupMedia from "./GroupMedia";
import GroupMeeting from "./GroupMeeting";
import GroupMember from "./GroupMember";
import GroupTask from "./GroupTask";
import GroupVoting from "./GroupVoting";

function GroupItemDetail({ type }) {
  if (type === GROUP_FUNCTION.MEMBER) {
    return <GroupMember />;
  }
  if (type === GROUP_FUNCTION.MEETING) {
    return <GroupMeeting />;
  }
  if (type === GROUP_FUNCTION.TASK) {
    return <GroupTask />;
  }
  if (type === GROUP_FUNCTION.IMAGE || type === GROUP_FUNCTION.FILE) {
    return <GroupMedia type={type} />;
  }
  if (type === GROUP_FUNCTION.FAQ) {
    return <div>FAQ</div>;
  }
  if (type === GROUP_FUNCTION.VOTING) {
    return <GroupVoting />;
  }
  return <div>{type}</div>;
}
GroupItemDetail.propTypes = {
  // eslint-disable-next-line react/require-default-props
  type: PropTypes.string
};
export default GroupItemDetail;
