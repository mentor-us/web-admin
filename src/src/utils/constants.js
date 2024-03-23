import { API_URL } from "config";
import coaching from "assets/images/coaching.png";
import group from "assets/images/group.png";
import jpeg from "assets/images/jpeg.png";
import jpg from "assets/images/jpg.png";
import mentor from "assets/images/mentor.png";
import mentorus from "assets/images/mentor_us.png";
import mentoring from "assets/images/mentoring.png";
import mentorship from "assets/images/mentorship.png";
import png from "assets/images/png.png";
import teamwork from "assets/images/teamwork.png";
import training from "assets/images/training.png";

export const googleSignInURL = `${API_URL}oauth2/authorize/google?redirect_uri=${window.location.origin}/auth/redirect`;
export const microsoftSignInURL = `${API_URL}oauth2/authorize/azure?redirect_uri=${window.location.origin}/auth/redirect`;

export const imageExtensionList = [
  { src: png, name: "png.png", type: "png" },
  { src: jpeg, name: "jpeg.png", type: "jpeg" },
  { src: jpg, name: "jpg.png", type: "jpg" }
];

export const imageIconList = [
  { src: mentorus, name: "mentor_us.png" },
  { src: mentor, name: "mentor.png" },
  { src: mentoring, name: "mentoring.png" },
  { src: mentorship, name: "mentorship.png" },
  { src: teamwork, name: "teamwork.png" },
  { src: training, name: "training.png" },
  { src: coaching, name: "coaching.png" },
  { src: group, name: "group.png" }
];

export const emailDomainsValid = [
  "@gmail.com",
  "@fit.hcmus.edu.vn",
  "@student.hcmus.edu.vn",
  "@hcmus.edu.vn",
  "@mso.hcmus.edu.vn"
];

export const roleAccountList = [
  { role: "Quản trị viên cấp cao", value: 2, textValue: "SUPER_ADMIN" },
  { role: "Quản trị viên", value: 1, textValue: "ADMIN" },
  { role: "Người dùng", value: 0, textValue: "USER" }
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

export const USER_ROLE = {
  MENTOR: "MENTOR",
  MENTEE: "MENTEE"
};

export const MESSAGE_TYPE = {
  TEXT: "TEXT",
  FILE: "FILE",
  IMAGE: "IMAGE",
  VOTE: "VOTE",
  MEETING: "MEETING"
};

export const CHANNEL_PERMISSION = {
  SEND_FILES: "SEND_FILES",
  TASK_MANAGEMENT: "TASK_MANAGEMENT",
  MEETING_MANAGEMENT: "MEETING_MANAGEMENT",
  BOARD_MANAGEMENT: "BOARD_MANAGEMENT",
  FAQ_MANAGEMENT: "FAQ_MANAGEMENT",
  GROUP_SETTINGS: "GROUP_SETTINGS"
};

export const VOTE_STATUS = {
  OPEN: "OPEN",
  CLOSED: "CLOSED"
};
