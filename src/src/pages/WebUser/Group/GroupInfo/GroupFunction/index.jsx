import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";

import {
  CalendarIcon,
  FaqIcon,
  GroupIcon,
  MediaIcon,
  TaskListIcon,
  VotingQuestionIcon
} from "assets/svgs";

function GroupFunction({ type, permission, selectedType }) {
  if (!permission) {
    // eslint-disable-next-line no-param-reassign
    permission = [];
  }

  switch (type) {
    case "member":
      return (
        <ListItemButton>
          <ListItemIcon>
            <GroupIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            className="text-base line-clamp-1"
            primary="Xem thành viên"
            onClick={() => {
              selectedType("MEMBER");
            }}
          />
        </ListItemButton>
      );
    case "utility":
      return (
        <>
          <ListItemButton>
            <ListItemIcon>
              <CalendarIcon width={20} height={20} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              className="text-base line-clamp-1"
              primary="Lịch hẹn"
              onClick={() => {
                selectedType("MEETING");
              }}
            />
          </ListItemButton>
          {permission.includes("BOARD_MANAGEMENT") && (
            <ListItemButton>
              <ListItemIcon>
                <VotingQuestionIcon width={20} height={20} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                className="text-base line-clamp-1"
                primary="Bình chọn"
                onClick={() => {
                  selectedType("VOTING");
                }}
              />
            </ListItemButton>
          )}
          {permission.includes("TASK_MANAGEMENT") && (
            <ListItemButton>
              <ListItemIcon>
                <TaskListIcon width={20} height={20} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                className="text-base line-clamp-1"
                primary="Danh sách công việc"
                onClick={() => {
                  selectedType("TASK");
                }}
              />
            </ListItemButton>
          )}
          {permission.includes("FAQ_MANAGEMENT") && (
            <ListItemButton>
              <ListItemIcon>
                <FaqIcon width={20} height={20} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                className="text-base line-clamp-1"
                primary="FAQs"
                onClick={() => {
                  selectedType("FAQ");
                }}
              />
            </ListItemButton>
          )}
        </>
      );
    case "media":
      return (
        <>
          <ListItemButton>
            <ListItemIcon>
              <MediaIcon width={20} height={20} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              className="text-base line-clamp-1"
              primary="Hình ảnh"
              onClick={() => {
                selectedType("IMAGE");
              }}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <MediaIcon width={20} height={20} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              className="text-base line-clamp-1"
              primary="Tập tin"
              onClick={() => {
                selectedType("FILE");
              }}
            />
          </ListItemButton>
        </>
      );
    default:
      return null;
  }
}
GroupFunction.propTypes = {
  type: PropTypes.oneOf(["member", "utility", "media"]).isRequired,
  permission: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedType: PropTypes.func.isRequired
};

export default GroupFunction;
