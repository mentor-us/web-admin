import PropTypes from "prop-types";

import GroupMember from "./GroupMember";

function GroupItemDetail({ type }) {
  if (type === "MEMBER") {
    return <GroupMember />;
  }
  if (type === "MEETING") {
    return <div>Lịch hẹn</div>;
  }
  if (type === "TASK") {
    return <div>Công việc</div>;
  }
  if (type === "IMAGE" || type === "FILE") {
    return <div>Bộ sưu tập</div>;
  }
  if (type === "FAQ") {
    return <div>FAQ</div>;
  }
  if (type === "IMAGE" || type === "FILE") {
    return <div>Media</div>;
  }
  return <div>{type}</div>;
}
GroupItemDetail.propTypes = {
  // eslint-disable-next-line react/require-default-props
  type: PropTypes.string
};
export default GroupItemDetail;
