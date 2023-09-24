import { makeRequestSearch } from "utils";
import AxiosClient from "./AxiosClient";

export default class UserApi {
  static async findById(userId) {
    let user = {};
    try {
      const response = await AxiosClient.get(`api/users/${userId}`);
      user = response.data;
    } catch (error) {
      throw new Error(error.message);
    }
    return user;
  }

  static async findByIds(userIds) {
    const response = await Promise.all(
      userIds.map(async (userId) => {
        const user = await this.findById(userId);
        return user;
      })
    );
    return response.filter((x) => !!x);
  }

  static async getAllUser() {
    let userList = [];
    try {
      const response = await AxiosClient.get(`api/users/all`);

      if (response.success) {
        userList = response.data;
      }
    } catch (error) {
      throw new Error(error.message);
    }

    return userList;
  }

  static async getAllUserPaging(req) {
    const { page, size } = req;
    try {
      return await AxiosClient.get(`api/users/all-paging?page=${page}&size=${size}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(userID) {
    try {
      const response = await AxiosClient.delete(`api/users/${userID}`);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async add(req) {
    try {
      const response = await AxiosClient.post(`api/users`, req);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async disableAccount(req) {
    try {
      const response = await AxiosClient.patch(`api/users/disable`, req);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async enableAccount(req) {
    try {
      const response = await AxiosClient.patch(`api/users/enable`, req);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async search(req) {
    const reqUri = makeRequestSearch(req);

    try {
      return await AxiosClient.get(`api/users/find?${reqUri}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(id, data) {
    try {
      return await AxiosClient.patch(`api/users/${id}/admin`, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAccountDetail(id) {
    try {
      return await AxiosClient.get(`api/users/${id}/detail`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteMultiple(req) {
    try {
      const response = await AxiosClient.delete(`api/users`, { data: req });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async loadByEmail(req) {
    try {
      return await AxiosClient.get(`api/users/allByEmail?email=${req}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportAccount(req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/users/export?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportAccountSearch(req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/users/export/search?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportAccountMentee(id, req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/users/${id}/menteeGroups/export?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportAccountMentor(id, req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/users/${id}/mentorGroups/export?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async importAccount(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    let response;
    try {
      response = await AxiosClient.post(`api/users/import`, data, config);
    } catch (error) {
      throw new Error(error.message);
    }

    return response;
  }
}
