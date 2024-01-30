import { makeRequestSearch } from "utils";

import AxiosClient from "./AxiosClient";

const StatisticApi = {
  getGeneral(req) {
    return AxiosClient.get(`api/analytic?${req ? makeRequestSearch(req) : ""}`);
  },

  // async getGeneralByGroupCategory(req) {
  //   const reqUri = makeRequestSearch(req);
  //   try {
  //     return await AxiosClient.get(`api/analytic?${reqUri}`);
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  getByMonth(req) {
    return AxiosClient.get(`api/analytic/chart?${makeRequestSearch(req)}`);
  },

  getGroupsStatisticTableData(req) {
    const { page, pageSize } = req;
    return AxiosClient.get(`api/analytic/groups?page=${page}&pageSize=${pageSize}`);
  },

  // async filterGroupsStatisticTableData(req) {
  //   const { page, pageSize } = req;
  //   try {
  //     return await AxiosClient.get(`api/analytic/find?`);
  //     // return await AxiosClient.get(`api/analytic/groups?page=${page}&pageSize=${size}`);
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  findById(groupID) {
    return AxiosClient.get(`api/analytic/${groupID}`);
  },

  updateUserStatistic(userID, req) {
    return AxiosClient.patch(`api/analytic/${userID}`, req);
  },

  importGeneral(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    return AxiosClient.post(`api/analytic/import-multiple`, data, config);
  },

  importTrainingPointFile(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    return AxiosClient.post(`api/analytic/import-training-point`, data, config);
  },

  importStudyingPointFile(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    return AxiosClient.post(`api/analytic/import-studying-point`, data, config);
  },

  importEnglishCertFile(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    return AxiosClient.post(`api/analytic/import-has-english-cert`, data, config);
  },

  search(req) {
    return AxiosClient.get(`api/analytic/find?${makeRequestSearch(req)}`);
  },

  searchDetail(groupID, req) {
    return AxiosClient.get(`api/analytic/find/${groupID}?${makeRequestSearch(req)}`);
  },

  exportLog(req) {
    return AxiosClient.get(`api/analytic/log?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  exportStatistic(req) {
    return AxiosClient.get(`api/analytic/report?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  exportGroupStatistic(req) {
    return AxiosClient.get(`api/analytic/groups/export?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  exportGroupStatisticSearch(req) {
    return AxiosClient.get(`api/analytic/groups/export/search?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  exportGroupStatisticDetail(req, groupID) {
    return AxiosClient.get(`api/analytic/${groupID}/export?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  exportGroupStatisticDetailSearch(req, groupID) {
    return AxiosClient.get(`api/analytic/${groupID}/export/search?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  }
};

export default StatisticApi;
