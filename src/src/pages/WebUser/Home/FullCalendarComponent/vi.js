// vi.js
export default {
  code: "vi",
  week: {
    dow: 1, // Monday is the first day of the week
    doy: 4 // The week that contains Jan 4th is the first week of the year
  },
  buttonText: {
    prev: "Trước",
    next: "Tiếp",
    today: "Hôm nay",
    month: "Tháng",
    week: "Tuần",
    day: "Ngày",
    list: "Lịch"
  },
  noEventsText: "Không có sự kiện nào để hiển thị",
  moreLinkText: "Thêm",
  weekLabel: "Tuần",
  allDayText: "Cả ngày",
  eventLimitText(n) {
    return `+ thêm ${n}`;
  }
};
