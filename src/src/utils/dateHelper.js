/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */

const formatTimeNumber = (value) => {
  return value > 9 ? `${value}` : `0${value}`;
};

const DATE_FORMAT_TYPE = {
  DATE: "date",
  DATETIME: "datetime",
  TIME: "time"
};

const formatDate = (dateStr, type = DATE_FORMAT_TYPE.DATE) => {
  if (!dateStr) {
    return "N/A";
  }
  const date = new Date(dateStr);

  const hh = formatTimeNumber(date.getHours());
  const mm = formatTimeNumber(date.getMinutes());

  const dd = formatTimeNumber(date.getDate());
  const MM = formatTimeNumber(date.getMonth() + 1);
  const yyyy = formatTimeNumber(date.getFullYear());

  switch (type) {
    case "time":
      return `${hh}:${mm}`;
    case "date":
      return `${dd}/${MM}/${yyyy}`;
    case "datetime":
      return `${hh}:${mm}, ${dd}/${MM}/${yyyy}`;
    default:
      return `${hh}:${mm} - ${dd}/${MM}/${yyyy}`;
  }
};

const getMomentTime = (dateStr) => {
  if (!dateStr) {
    return "";
  }
  const date = new Date(dateStr);
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
        return `ngày ${formatDate(dateStr)}`;
    }
  }

  return `ngày ${formatDate(dateStr)}`;
};

export const getTime = (dateStr) => {
  const date = new Date(dateStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const hh = hours > 9 ? `${hours}` : `0${hours}`;
  const mm = minutes > 9 ? `${minutes}` : `0${minutes}`;

  return `${hh}:${mm} ${getMomentTime(dateStr)}`;
};

export const getTimeMeeting = (start, end) => {
  const time = {
    from: formatDate(start, "time"),
    to: formatDate(end, "time"),
    date: formatDate(start, "date"),
    display: `${formatDate(start, "time")} - ${getTime(end)}`
  };

  return time;
};

export { formatDate, getMomentTime };
