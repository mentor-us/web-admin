import { ServerError } from "errors";
import StatisticApi from "api/StatisticApi";

import ErrorWrapper from "./ErrorServiceWrapper";

const getGeneral = (req) => StatisticApi.getGeneral(req).then((response) => response.data);

const getByMonth = (req) => StatisticApi.getByMonth(req).then((response) => response.data.data);

const getGroupsStatisticTableData = async (req) =>
  StatisticApi.getGroupsStatisticTableData(req).then((response) => response.data);

const getStatisticDetail = async (req) =>
  StatisticApi.findById(req).then((response) => response.data);

const updateUserStatistic = async (id, req) =>
  StatisticApi.updateUserStatistic(id, req).then((response) => response.data);

const importGeneral = async (req) => {
  const response = await StatisticApi.importGeneral(req);

  if (response.returnCode !== 200) {
    // Code 903 | 904
    throw new ServerError(response.returnCode, response?.data[0]?.email);
  }

  return response.data;
};

const importTrainingPointFile = async (req) => {
  const response = await StatisticApi.importTrainingPointFile(req);

  if (response.returnCode !== 200) {
    // Code 903 | 904
    throw new ServerError(response.returnCode, Object.keys(response.data)[0]);
  }

  return response.data;
};

const importStudyingPointFile = async (req) => {
  const response = await StatisticApi.importStudyingPointFile(req);

  if (response.returnCode !== 200) {
    // Code 903 | 904
    throw new ServerError(response.returnCode, Object.keys(response.data)[0]);
  }

  return response.data;
};

const importEnglishCertFile = async (req) => {
  const response = await StatisticApi.importEnglishCertFile(req);

  if (response.returnCode === 200) {
    // Code 903 | 904
    throw new ServerError(response.returnCode, Object.keys(response.data)[0]);
  }

  return response.data;
};

const searchStatistic = async (req) => {
  const response = await StatisticApi.search(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const searchStatisticDetail = async (id, req) => {
  const response = await StatisticApi.searchDetail(id, req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const exportLog = (req) => StatisticApi.exportLog(req);

const exportStatistic = (req) => StatisticApi.exportStatistic(req);

const exportGroupStatistic = (req) => StatisticApi.exportGroupStatistic(req);

const exportGroupStatisticSearch = (req) => StatisticApi.exportGroupStatisticSearch(req);

const exportGroupStatisticDetail = (req, groupID) =>
  StatisticApi.exportGroupStatisticDetail(req, groupID);

const exportGroupStatisticDetailSearch = (req, groupID) =>
  StatisticApi.exportGroupStatisticDetailSearch(req, groupID);

const statisticServices = {
  getGeneral,
  // getGeneralByGroupCategory,
  getByMonth,
  getGroupsStatisticTableData,
  getStatisticDetail,
  updateUserStatistic,
  importGeneral,
  importTrainingPointFile,
  importStudyingPointFile,
  importEnglishCertFile,
  searchStatistic,
  searchStatisticDetail,
  exportLog,
  exportStatistic,
  exportGroupStatistic,
  exportGroupStatisticDetail,
  exportGroupStatisticSearch,
  exportGroupStatisticDetailSearch
};

export default ErrorWrapper(statisticServices);
