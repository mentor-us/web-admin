import StatisticApi from "api/StatisticApi";
import getMessage from "utils/message";

const getGeneral = async (req) => {
  try {
    const response = await StatisticApi.getGeneral(req);
    return response.data;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const getByMonth = async (req) => {
  try {
    const response = await StatisticApi.getByMonth(req);
    return response.data.data;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const getGroupsStatisticTableData = async (req) => {
  try {
    const response = await StatisticApi.getGroupsStatisticTableData(req);

    return response.data;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const getStatisticDetail = async (req) => {
  try {
    const response = await StatisticApi.findById(req);
    return response.data;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const updateUserStatistic = async (id, req) => {
  try {
    const response = await StatisticApi.updateUserStatistic(id, req);
    return response.data;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const importGeneral = async (req) => {
  let response;
  try {
    response = await StatisticApi.importGeneral(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    const errorCode = parseInt(error.message, 10);
    if (errorCode === 903 || errorCode === 904) {
      throw new Error(getMessage(errorCode, response.data[0].email));
    } else {
      throw new Error(getMessage(errorCode));
    }
  }
};

const importTrainingPointFile = async (req) => {
  let response;
  try {
    response = await StatisticApi.importTrainingPointFile(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    const errorCode = parseInt(error.message, 10);

    if (errorCode === 903 || errorCode === 904) {
      throw new Error(getMessage(errorCode, Object.keys(response.data)[0]));
    } else {
      throw new Error(getMessage(errorCode));
    }
  }
};

const importStudyingPointFile = async (req) => {
  let response;
  try {
    response = await StatisticApi.importStudyingPointFile(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    const errorCode = parseInt(error.message, 10);
    if (errorCode === 903 || errorCode === 904) {
      throw new Error(getMessage(errorCode, Object.keys(response.data)[0]));
    } else {
      throw new Error(getMessage(errorCode));
    }
  }
};

const importEnglishCertFile = async (req) => {
  let response;
  try {
    response = await StatisticApi.importEnglishCertFile(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    const errorCode = parseInt(error.message, 10);
    if (errorCode === 903 || errorCode === 904) {
      throw new Error(getMessage(errorCode, Object.keys(response.data)[0]));
    } else {
      throw new Error(getMessage(errorCode));
    }
  }
};

const searchStatistic = async (req) => {
  try {
    const response = await StatisticApi.search(req);

    if (response.returnCode === 200) {
      return response.data;
    }
    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const searchStatisticDetail = async (id, req) => {
  try {
    const response = await StatisticApi.searchDetail(id, req);
    if (response.returnCode === 200) {
      return response.data;
    }
    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportLog = async (req) => {
  try {
    const response = await StatisticApi.exportLog(req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportStatistic = async (req) => {
  try {
    const response = await StatisticApi.exportStatistic(req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportGroupStatistic = async (req) => {
  try {
    const response = await StatisticApi.exportGroupStatistic(req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportGroupStatisticSearch = async (req) => {
  try {
    const response = await StatisticApi.exportGroupStatisticSearch(req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportGroupStatisticDetail = async (req, groupID) => {
  try {
    const response = await StatisticApi.exportGroupStatisticDetail(req, groupID);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportGroupStatisticDetailSearch = async (req, groupID) => {
  try {
    const response = await StatisticApi.exportGroupStatisticDetailSearch(req, groupID);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

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
export default statisticServices;
