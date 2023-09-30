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
  return date;
};

export { formatDate, formatDateExcel, formatDateFromDuration, getAnotherDateFromToday };
