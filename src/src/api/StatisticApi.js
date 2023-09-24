import { makeRequestSearch } from "utils";
import AxiosClient from "./AxiosClient";

export default class StatisticApi {
  static async getGeneral(req) {
    if (req !== "" || req !== null) {
      const reqUri = makeRequestSearch(req);
      try {
        return await AxiosClient.get(`api/analytic?${reqUri}`);
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      try {
        return await AxiosClient.get(`api/analytic?`);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

  // static async getGeneralByGroupCategory(req) {
  //   const reqUri = makeRequestSearch(req);
  //   try {
  //     return await AxiosClient.get(`api/analytic?${reqUri}`);
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  static async getByMonth(req) {
    const reqUri = makeRequestSearch(req);

    try {
      return await AxiosClient.get(`api/analytic/chart?${reqUri}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getGroupsStatisticTableData(req) {
    const { page, pageSize } = req;
    try {
      return await AxiosClient.get(`api/analytic/groups?page=${page}&pageSize=${pageSize}`);
      // return await AxiosClient.get(`api/analytic/groups?page=${page}&pageSize=${size}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // static async filterGroupsStatisticTableData(req) {
  //   const { page, pageSize } = req;
  //   try {
  //     return await AxiosClient.get(`api/analytic/find?`);
  //     // return await AxiosClient.get(`api/analytic/groups?page=${page}&pageSize=${size}`);
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  static async findById(groupID) {
    try {
      return await AxiosClient.get(`api/analytic/${groupID}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateUserStatistic(userID, req) {
    try {
      return await AxiosClient.patch(`api/analytic/${userID}`, req);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async importGeneral(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    try {
      return await AxiosClient.post(`api/analytic/import-multiple`, data, config);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async importTrainingPointFile(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    try {
      return await AxiosClient.post(`api/analytic/import-training-point`, data, config);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async importStudyingPointFile(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    try {
      return await AxiosClient.post(`api/analytic/import-studying-point`, data, config);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async importEnglishCertFile(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    try {
      return await AxiosClient.post(`api/analytic/import-has-english-cert`, data, config);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async search(req) {
    const reqUri = makeRequestSearch(req);

    const url = `api/analytic/find?${reqUri}`;
    try {
      return await AxiosClient.get(url);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async searchDetail(groupID, req) {
    const reqUri = makeRequestSearch(req);
    const url = `api/analytic/find/${groupID}?${reqUri}`;
    try {
      return await AxiosClient.get(url);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportLog(req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/analytic/log?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportStatistic(req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/analytic/report?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportGroupStatistic(req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/analytic/groups/export?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportGroupStatisticSearch(req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/analytic/groups/export/search?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportGroupStatisticDetail(req, groupID) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/analytic/${groupID}/export?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportGroupStatisticDetailSearch(req, groupID) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/analytic/${groupID}/export/search?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
