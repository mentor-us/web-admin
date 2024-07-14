/* eslint-disable no-unused-vars */
import { API_URL } from "config";

import { groupStatusList } from "./constants";

export * from "./auth";
export * from "./dateHelper";

export function convertToPlain(html) {
  // Create a new div element
  const tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || "";
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getImageUrlWithKey(key) {
  if (!key) {
    return "";
  }

  if (key.startsWith("https") || key.startsWith("data:image/")) {
    return key;
  }

  return `${API_URL}infra/blob/mentorus/${key}`;
}

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

export function makeTxtElipsis(str) {
  if (str.length > 35) {
    return `${str.substr(0, 20)}...${str.substr(str.length - 10, str.length)}`;
  }
  return str;
}

export const isEmptyObject = (objectIns) => {
  return objectIns && Object.keys(objectIns).length === 0 && objectIns.constructor === Object;
};

export const getFileExtention = (filename) => {
  if (!filename) {
    return "";
  }
  const splitedFileName = filename.toLowerCase().split(".");

  // To get the file extension
  return splitedFileName[splitedFileName.length - 1];
};

export const formatFileSize = (size) => {
  let result;
  switch (true) {
    case size < 1000:
      result = `${size} B`;
      break;
    case size >= 1000 && size < 1000000:
      result = `${(size / 1000).toFixed(2)} KB`;
      break;
    case size >= 1000000:
      result = `${(size / 1000000).toFixed(2)} MB`;
      break;
    default:
      result = "N/A";
  }
  return result;
};

export const isEmailValid = (email) => {
  // const re = /^[^\s@]+@[^\s@]+\.[^a-zA-z@]+$/;
  // Ref: https://www.baeldung.com/java-email-validation-regex
  const emailRegex = /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/gm;
  const testAllNumberRegex = /^[\d@.]+$/gm;

  if (testAllNumberRegex.test(email)) {
    return false;
  }

  return emailRegex.test(email);
};

export const getGroupStatusList = (removedStatus = "") => {
  let statusList = groupStatusList;
  if (removedStatus.length > 0) {
    if (removedStatus === "OUTDATED") {
      statusList = statusList.filter((item) => item.textValue !== removedStatus);
    }
  }

  return statusList;
};

export const getValueOfList = (sourceList, inputValue, inputKey, outputKey = null) => {
  if (inputValue === null || inputValue === undefined) return inputValue;

  const result = sourceList.find((item) => item[inputKey] === inputValue);
  return outputKey ? result[outputKey] : result;
};

export const removeCategoryFromObject = (categories, removedCategory) => {
  if (!categories || categories.length === 0 || !removedCategory) {
    return [];
  }

  if (Array.isArray(removedCategory)) {
    if (removedCategory.length > 0) {
      const newRemovedCategory = removedCategory.map((item) => item.id);
      return categories.filter((item) => !newRemovedCategory.includes(item.id));
    }

    return categories;
  }

  return categories.filter((item) => item.id !== removedCategory.id);
};

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const addCheckedProp = (target, value = false) => {
  if (Array.isArray(target) && target.length > 0) {
    return target.map((item) => Object.assign(item, { isChecked: value }));
  }
  if (typeof target === "object" && target !== null) {
    return Object.assign(target, { isChecked: value });
  }

  return target;
};

export const makeRequestSearch = (req) => {
  const keyArr = Object.keys(req);
  const valArr = Object.values(req);
  return keyArr.map((item, index) => `${item}=${valArr[index]}`).join("&");
};

export const calculateDays = (date1, date2, type = "date") => {
  const difference = date1.diff(date2);
  let result;

  if (type === "date") {
    result = Math.ceil(difference / (1000 * 3600 * 24));
  } else if (type === "month") {
    result = Math.ceil(difference / (1000 * 3600 * 24 * 31));
  } else if (type === "year") {
    result = Math.ceil(difference / (1000 * 3600 * 24 * 365));
  }

  return result;
};

export const numberWithCommas = (x) => {
  if (x === null || x === undefined) return 0;
  if (x > 9999999999) {
    return `Hơn ${Math.floor(x / 1000000000)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tỷ`;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const compareVietnameseWord = (rowA, rowB, id, desc) => {
  const a = rowA.values[id];
  const b = rowB.values[id];
  return a.localeCompare(b, "vi");
};

export const toDateTime = (date) => {
  if (!date) return null;
  const parts = date.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
};

export const compareDate = (rowA, rowB, id, desc) => {
  const date1 = toDateTime(rowA.values[id]);
  const date2 = toDateTime(rowB.values[id]);

  if (!date1 || !date2) return -1;

  if (date1.getTime() < date2.getTime()) return -1;
  if (date1.getTime() > date2.getTime()) return 1;
  return 0;
};

export const compareNumber = (rowA, rowB, id, desc) => {
  const num1 = parseInt(rowA.values[id].toString().replace(",", ""), 10) || 0;
  const num2 = parseInt(rowB.values[id].toString().replace(",", ""), 10) || 0;

  if (num1 < num2) return -1;
  if (num1 > num2) return 1;
  return 0;
};
