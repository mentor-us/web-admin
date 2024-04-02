import dayjs from "dayjs";
import { parse } from "tinyduration";

const convertMinuteToYearMonthDay = (minutes) => {
  const units = {
    tháng: 24 * 60 * 30,
    ngày: 24 * 60,
    giờ: 60
  };

  const result = [];
  let value = minutes;
  // eslint-disable-next-line no-restricted-syntax
  for (const name in units) {
    if (Object.hasOwnProperty.call(units, name)) {
      const element = units[name];
      const p = Math.floor(value / element);
      if (p >= 1) result.push(`${p} ${name}`);
      value %= element;
    }
  }

  return result;
};

const formatDateExcel = () => {
  const date = new Date();
  const year = date.toLocaleString("es-ES", { year: "numeric" }, { timeZone: "Asia/Bangkok" });
  const month = date.toLocaleString("es-ES", { month: "2-digit" }, { timeZone: "Asia/Bangkok" });
  const day = date.toLocaleString("es-ES", { day: "2-digit" }, { timeZone: "Asia/Bangkok" });
  const hour = date.toLocaleString("es-ES", { hour: "2-digit" }, { timeZone: "Asia/Bangkok" });
  const minute = date.toLocaleString("es-ES", { minute: "2-digit" }, { timeZone: "Asia/Bangkok" });
  const second = date.toLocaleString("es-ES", { second: "2-digit" }, { timeZone: "Asia/Bangkok" });

  // YYYYMMDDHHMMSS
  return [year, month, day, hour, minute, second].join("");
};

const formatDate = (date) => {
  return new Date(date).toLocaleString(
    "es-ES",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    },
    { timeZone: "Asia/Bangkok" }
  );
};

const formatDateFromDuration = (duration) => {
  if (!duration) return "";
  const time = parse(duration);
  let minutes = 0;
  if (time.seconds) minutes += 1;
  if (time.minutes) minutes += time.minutes;
  if (time.hours) minutes += time.hours * 60; // dùng thư viện parse để lấy dc tổng giờ

  const result = convertMinuteToYearMonthDay(minutes); // chuyển giờ thành tháng, ngày hoặc ngày
  if (result.length === 0) return `Đã kết thúc`;
  if (result.length === 1) return `${result[0]}`; // mảng 1 phần tử nghĩa là tính theo ngày
  return `${result[0]}, ${result[1]}`; // mảng 2 phần tử nghĩa là tính theo tháng , ngày
};

const getAnotherDateFromToday = (currentDate = new Date(), value = -4, type = "year") => {
  const date = new Date(currentDate);
  switch (type) {
    case "date":
      date.setDate(date.getDate() + value);
      break;
    case "month":
      date.setMonth(date.getMonth() + value);
      break;
    case "year":
      date.setFullYear(date.getFullYear() + value);
      break;
    default:
      break;
  }
  return dayjs(date);
};
const getMomentTime = (src) => {
  if (!src) {
    return "";
  }
  const date = new Date(src);
  const current = new Date();

  if (date.getFullYear() === current.getFullYear() && date.getMonth() === current.getMonth()) {
    const interval = date.getDate() - current.getDate();
    switch (interval) {
      case -1:
        return "hôm qua";
      case 0:
        return "hôm nay";
      case 1:
        return "ngày mai";
      default:
        // eslint-disable-next-line no-unused-expressions
        `ngày ${formatDate(src)}`;
        break;
    }
  }
  return `ngày ${formatDate(src)}`;
};
const getTime = (src) => {
  const date = new Date(src);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const hh = hours > 9 ? `${hours}` : `0${hours}`;
  const mm = minutes > 9 ? `${minutes}` : `0${minutes}`;

  return `${hh}:${mm} ${getMomentTime(src)}`;
};
const getTimeMeeting = (start, end) => {
  const time = {
    from: formatDate(start, "time"),
    to: formatDate(end, "time"),
    date: formatDate(start, "date"),
    display: `${formatDate(start, "time")} - ${getTime(end)}`
  };

  return time;
};

export {
  formatDate,
  formatDateExcel,
  formatDateFromDuration,
  getAnotherDateFromToday,
  getTimeMeeting
};
