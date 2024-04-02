import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";

import {
  CalendarIcon,
  ChartIcon,
  FaqIcon,
  GalleryIcon,
  GroupIcon,
  TaskListIcon
} from "assets/svgs";

import { CHANNEL_PERMISSION, GROUP_FUNCTION } from "utils/constants";

function GroupFunction({ type, permission, selectedType }) {
  if (!permission) {
    // eslint-disable-next-line no-param-reassign
    permission = [];
  }

  switch (type) {
    case "member":
      return (
        <ListItemButton
          onClick={() => {
            selectedType(GROUP_FUNCTION.MEMBER);
          }}
        >
          <ListItemIcon>
            <GroupIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            className="text-base line-clamp-1"
            primary="Xem thành viên"
          />
        </ListItemButton>
      );
    case "utility":
      return (
        <>
          <ListItemButton
            onClick={() => {
              selectedType(GROUP_FUNCTION.MEETING);
            }}
          >
            <ListItemIcon>
              <CalendarIcon width={20} height={20} />
            </ListItemIcon>
            <ListItemText disableTypography className="text-base line-clamp-1" primary="Lịch hẹn" />
          </ListItemButton>
          {permission.includes(CHANNEL_PERMISSION.BOARD_MANAGEMENT) && (
            <ListItemButton
              onClick={() => {
                selectedType(GROUP_FUNCTION.VOTING);
              }}
            >
              <ListItemIcon>
                <ChartIcon width={20} height={20} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                className="text-base line-clamp-1"
                primary="Bình chọn"
                onClick={() => {
                  selectedType(GROUP_FUNCTION.VOTING);
                }}
              />
            </ListItemButton>
          )}
          {permission.includes(CHANNEL_PERMISSION.TASK_MANAGEMENT) && (
            <ListItemButton
              onClick={() => {
                selectedType(GROUP_FUNCTION.TASK);
              }}
            >
              <ListItemIcon>
                <TaskListIcon width={20} height={20} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                className="text-base line-clamp-1"
                primary="Danh sách công việc"
              />
            </ListItemButton>
          )}
          {permission.includes(CHANNEL_PERMISSION.FAQ_MANAGEMENT) && (
            <ListItemButton
              onClick={() => {
                selectedType(GROUP_FUNCTION.FAQ);
              }}
            >
              <ListItemIcon>
                <FaqIcon width={20} height={20} />
              </ListItemIcon>
              <ListItemText disableTypography className="text-base line-clamp-1" primary="FAQs" />
            </ListItemButton>
          )}
        </>
      );
    case "media":
      return (
        <>
          <ListItemButton
            onClick={() => {
              selectedType(GROUP_FUNCTION.IMAGE);
            }}
          >
            <ListItemIcon>
              <GalleryIcon width={20} height={20} />
            </ListItemIcon>
            <ListItemText disableTypography className="text-base line-clamp-1" primary="Hình ảnh" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              selectedType(GROUP_FUNCTION.FILE);
            }}
          >
            <ListItemIcon>
              <FolderOutlinedIcon width={20} height={20} />
            </ListItemIcon>
            <ListItemText disableTypography className="text-base line-clamp-1" primary="Tập tin" />
          </ListItemButton>
        </>
      );
    default:
      return null;
  }
}
GroupFunction.propTypes = {
  type: PropTypes.oneOf(["member", "utility", "media"]).isRequired,
  // eslint-disable-next-line react/require-default-props
  permission: PropTypes.arrayOf(PropTypes.string),
  selectedType: PropTypes.func.isRequired
};

export default GroupFunction;
