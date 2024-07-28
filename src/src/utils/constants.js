import { API_URL } from "config";
import EMOJI_IMAGES from "assets/images/emojis";
import jpeg from "assets/images/jpeg.png";
import jpg from "assets/images/jpg.png";
import png from "assets/images/png.png";

export const ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  ROLE_USER: "ROLE_USER",
  USER: "USER"
};

export const googleSignInURL = `${API_URL}oauth2/authorize/google?redirect_uri=${window.location.origin}/auth/redirect`;
export const microsoftSignInURL = `${API_URL}oauth2/authorize/azure?redirect_uri=${window.location.origin}/auth/redirect`;

export const imageExtensionList = [
  { src: png, name: "png.png", type: "png" },
  { src: jpeg, name: "jpeg.png", type: "jpeg" },
  { src: jpg, name: "jpg.png", type: "jpg" }
];

export const imageIconList = [
  { src: "default/group-category/1.png", name: "mentor" },
  { src: "default/group-category/2.png", name: "mentor2" },
  { src: "default/group-category/3.png", name: "mentoring" },
  { src: "default/group-category/4.png", name: "mentorship" },
  { src: "default/group-category/5.png", name: "teamwork" },
  { src: "default/group-category/6.png", name: "training.png" },
  { src: "default/group-category/7.png", name: "coaching" },
  { src: "default/group-category/8.png", name: "group" }
];

export const emailDomainsValid = [
  "@gmail.com",
  "@fit.hcmus.edu.vn",
  "@student.hcmus.edu.vn",
  "@hcmus.edu.vn",
  "@mso.hcmus.edu.vn"
];

export const roleAccountList = [
  { role: "Quản trị viên cấp cao", value: 2, textValue: ROLE.SUPER_ADMIN },
  { role: "Quản trị viên", value: 1, textValue: ROLE.ADMIN },
  { role: "Người dùng", value: 0, textValue: ROLE.USER }
];

export const groupStatusList = [
  { label: "Chưa bắt đầu", textValue: "INACTIVE", value: 0, color: "#FFC93C" },
  { label: "Đang hoạt động", textValue: "ACTIVE", value: 1, color: "green" },
  { label: "Bị khóa", textValue: "DISABLED", value: 2, color: "#1A73E8" },
  { label: "Hết thời hạn", textValue: "OUTDATED", value: 3, color: "#7895B2" },
  { label: "Đã xóa", textValue: "DELETED", value: 4, color: "red" }
];

export const accountStatusList = [
  { label: "Hoạt động", textValue: "ACTIVE", value: true, color: "green" },
  { label: "Bị khóa", textValue: "DISABLED", value: false, color: "red" }
];

export const roleMemberList = [
  { role: "Mentee", value: 0, textValue: "MENTEE" },
  { role: "Mentor", value: 1, textValue: "MENTOR" }
];

export const genderList = [
  { label: "Nam", value: 1, textValue: "MALE" },
  { label: "Nữ", value: 0, textValue: "FEMALE" }
];

export const roleMemberEnum = {
  mentor: 1,
  mentee: 0
};

export const groupStatusEnum = {
  ACTIVE: "ACTIVE", // Đang hoạt động
  DISABLED: "DISABLED", // Bị khóa
  OUTDATED: "OUTDATED", // Quá thời hạn
  INACTIVE: "INACTIVE" // Chưa bắt đầu
};

export const groupCategoryStatusList = [
  { label: "Hoạt động", textValue: "ACTIVE", value: 1, color: "green" },
  { label: "Đã xóa", textValue: "DELETED", value: 2, color: "red" }
];

export const getRouteUrl = (...paths) => {
  return paths.join("");
};

export const ROUTE_URL = {
  SIGN_IN: "/sign-in",

  // Admin
  ADMIN_ROOT: "/admin",

  // Group management
  GROUP_ROOT: "/admin/groups",

  // Group category management
  GROUP_CATEGORY: "/admin/group-category",

  // Account management
  ACCOUNT_ROOT: "/admin/account-management",

  // Statistic
  STATISTIC_ROOT: "/admin/statistic",

  // USER_URL
  CHAT_ROOT: "/chat",

  CALENDAR_ROOT: "calendar"
};

export const MEETING_REPEATED_TYPE = {
  NONE: "NONE",
  EVERY_DAY: "EVERY_DAY",
  ONCE_A_WEEK: "ONCE_A_WEEK",
  ONCE_TWO_WEEKS: "ONCE_TWO_WEEKS",
  ONCE_A_MONTH: "ONCE_A_MONTH"
};

export const INIT_TOTAL_REACTION = {
  data: [],
  ownerReacted: [],
  total: 0
};

export const USER_ROLE = {
  MENTOR: "MENTOR",
  MENTEE: "MENTEE"
};

export const MESSAGE_STATUS = {
  DELETED: "DELETED",
  EDITED: "EDITED"
};

export const MESSAGE_TYPE = {
  TEXT: "TEXT",
  FILE: "FILE",
  IMAGE: "IMAGE",
  VOTE: "VOTE",
  MEETING: "MEETING",
  TASK: "TASK"
};
export const MESSAGE_CONTENT = {
  TEXT: "tin nhắn",
  FILE: "file",
  IMAGE: "hình ảnh",
  VOTE: "bình chọn",
  MEETING: "lịch hẹn",
  TASK: "công việc"
};

export const CHANNEL_PERMISSION = {
  SEND_FILES: "SEND_FILES",
  TASK_MANAGEMENT: "TASK_MANAGEMENT",
  MEETING_MANAGEMENT: "MEETING_MANAGEMENT",
  BOARD_MANAGEMENT: "BOARD_MANAGEMENT",
  FAQ_MANAGEMENT: "FAQ_MANAGEMENT",
  GROUP_SETTINGS: "GROUP_SETTINGS"
};

export const CHANNEL_TYPE = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
  PRIVATE_MESSAGE: "PRIVATE_MESSAGE"
};

export const VOTE_STATUS = {
  OPEN: "OPEN",
  CLOSED: "CLOSED"
};

export const UPLOAD_STATUS = {
  SUCCESS: "Success",
  FAIL: "Fail",
  UPLOADING: "Uploading"
};

export const SUPPORTED_FILE_UPLOAD = [
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".pdf",
  ".mp3"
];
export const SUPPORTED_VIDEO_EXT = [".mp4", ".mkv", ".qt"];
export const MAX_FILE_IMAGE_SIZE = 100; // 5MB

export const SUPPORTED_IMAGE_EXT = [
  ".jpg",
  ".jpeg",
  ".jpe",
  ".jif",
  ".jfif",
  ".jfi",
  ".png",
  ".gif",
  ".webp",
  ".tiff",
  ".tif",
  ".heif",
  ".heic",
  ".mp4"
];

export const LIMIT_IMAGES = 5; // Max 5 image can send
export const LIMIT_VIDEOS = 1;

export const TaskStatusObject = {
  TO_DO: {
    key: "TO_DO",
    displayName: "Mới",
    color: "#333",
    backgroundColor: "#ebebeb",
    icon: "progress-close"
  },
  IN_PROGRESS: {
    key: "IN_PROGRESS",
    displayName: "Đang thực hiện",
    color: "#2A7BDE",
    backgroundColor: "#2A7BDE",
    icon: "progress-upload"
  },
  DONE: {
    key: "DONE",
    displayName: "Hoàn thành",
    color: "#4EA05B",
    backgroundColor: "#4EA05B",
    icon: "progress-check"
  },
  OVERDUE: {
    key: "OVERDUE",
    displayName: "Đã trễ hạn",
    color: "#C01C28",
    backgroundColor: "#C01C28",
    icon: "progress-alert"
  },
  NULL: {
    key: "NULL",
    displayName: "",
    color: "transparent",
    backgroundColor: "transparent",
    icon: ""
  }
};
export const TASK_STATUS = [
  {
    key: "TO_DO",
    displayName: "Mới",
    color: "#333",
    backgroundColor: "#ebebeb",
    icon: "progress-close"
  },
  {
    key: "IN_PROGRESS",
    displayName: "Đang thực hiện",
    color: "#2A7BDE",
    backgroundColor: "#2A7BDE",
    icon: "progress-upload"
  },
  {
    key: "DONE",
    displayName: "Hoàn thành",
    color: "#4EA05B",
    backgroundColor: "#4EA05B",
    icon: "progress-check"
  }
  // {
  //   key: "OVERDUE",
  //   displayName: "Đã trễ hạn",
  //   color: "#C01C28",
  //   backgroundColor: "#C01C28",
  //   icon: "progress-alert"
  // }
];

export const EMOJI_ICONS = {
  LIKE_INACTIVE: EMOJI_IMAGES.LikeEmojiInactive,
  LIKE: EMOJI_IMAGES.LikeEmoji,
  LOVE_EYE: EMOJI_IMAGES.LoveEyeEmoji,
  SMILE: EMOJI_IMAGES.SmileEmoji,
  CRY_FACE: EMOJI_IMAGES.CryFaceEmoji,
  CURIOUS: EMOJI_IMAGES.CuriousEmoji,
  ANGRY_FACE: EMOJI_IMAGES.AngryFaceEmoji
};
export const GROUP_FUNCTION = {
  MEMBER: "MEMBER",
  UTILITY: "UTILITY",
  MEDIA: "MEDIA",
  FAQ: "FAQ",
  MEETING: "MEETING",
  TASK: "TASK",
  VOTING: "VOTING",
  IMAGE: "IMAGE",
  FILE: "FILE"
};
export const Color = {
  primary: "#006EDC",
  secondary: "#2F88FF",
  borderActive: "#2F88FF",
  border: "#C9C9C9",
  backgroundChat: "#E2E9F3",
  backgroundGray: "#ebebeb",
  other: "#2F88FF",
  lineSeparator: "#ccc",
  white: "#fff",
  black: "#000",
  messageChat: "#333",
  mentionListBackground: "#f5faff",
  online: "#00FF00",
  offline: "#CCCCCC",
  transparent: "transparent",
  seeMoreColor: "#A7A7A7",
  text: ["#333", "#444", "#555", "#667", "#777", "#888", "#aaa"],
  gray: ["#E2E9F3", "#ebebeb", "#C9C9C9", "#F1F1F1", "#454545"],
  green: "#299C49",
  red: "#F05B51",
  orange: "#FD971F",
  violet: "#A347BA",
  blue: "#3281ef",
  opacity: ["#0007"],
  votePercentColor: "#C2E5F5"
};
export const ACTION_IMAGE = {
  SEND_IMAGE: "SEND_IMAGE",
  UPLOAD_IMAGE: "UPLOAD_IMAGE",
  UPDATE_AVATAR_GROUP: "UPDATE_AVATAR_GROUP",
  UPDATE_AVATAR_USER: "UPDATE_AVATAR_USER"
};
export const AVATAR_SIZE = 90;
export const WALLPAPER_HEIGHT = 200;
export const WALLPAPER_WIDTH = "100%";
export const NotePermission = [
  //  EDIT: "Chỉnh sửa",
  {
    label: "Xem",
    key: "VIEW"
  },
  // VIEW: "Xem"
  {
    label: "Chỉnh sửa",
    key: "EDIT"
  },
  {
    label: "Xóa",
    key: "DELETE"
  }
];
export const NoteShareType = [
  {
    label: "Công khai",
    value: "PUBLIC"
  },
  {
    label: "Mentor xem",
    value: "MENTOR_VIEW"
  },
  {
    label: "Mentor chỉnh sửa",
    value: "MENTOR_EDIT"
  },
  {
    label: "Riêng tư",
    value: "PRIVATE"
  }
];
export const NoteShareObject = {
  PUBLIC: "Công khai",
  MENTOR_VIEW: "Mentor xem",
  MENTOR_EDIT: "Mentor chỉnh sửa",
  PRIVATE: "Riêng tư"
};
export const GradePermission = [
  //  EDIT: "Chỉnh sửa",
  {
    label: "Xem",
    key: "VIEW"
  },
  {
    label: "Xóa",
    key: "DELETE"
  }
];
export const GradeShareObject = {
  PUBLIC: "Công khai",
  MENTOR: "Mentor",
  PRIVATE: "Riêng tư"
};
export const GradeShareType = [
  {
    label: "Công khai",
    value: "PUBLIC"
  },
  {
    label: "Mentor",
    value: "MENTOR"
  },
  {
    label: "Riêng tư",
    value: "PRIVATE"
  }
];
