import { makeRequestSearch } from "utils";
import AxiosClient from "./AxiosClient";
import ErrorWrapper from "./ErrorWrapper";

const UserApi = {
  async findById(userId) {
    let user = {};
    const response = await AxiosClient.get(`api/users/${userId}`);
    user = response.data;
    return user;
  },

  async findByIds(userIds) {
    const response = await Promise.all(
      userIds.map(async (userId) => {
        const user = await this.findById(userId);
        return user;
      })
    );
    return response.filter((x) => !!x);
  },

  async getAllUser() {
    let userList = [];
    const response = await AxiosClient.get(`api/users/all`);
    if (response.success) {
      userList = response.data;
    }
    return userList;
  },

  getAllUserPaging(req) {
    const { page, size } = req;

    return AxiosClient.get(`api/users/all-paging?page=${page}&size=${size}`);
  },

  delete(userID) {
    return AxiosClient.delete(`api/users/${userID}`);
  },

  add(req) {
    return AxiosClient.post(`api/users`, req);
  },

  disableAccount(req) {
    return AxiosClient.patch(`api/users/disable`, req);
  },

  async enableAccount(req) {
    return AxiosClient.patch(`api/users/enable`, req);
  },

  search(req) {
    const reqUri = makeRequestSearch(req);

    return AxiosClient.get(`api/users/find?${reqUri}`);
  },

  update(id, data) {
    return AxiosClient.patch(`api/users/${id}/admin`, data);
  },

  getAccountDetail(id) {
    return AxiosClient.get(`api/users/${id}/detail`);
  },

  deleteMultiple(req) {
    return AxiosClient.delete(`api/users`, { data: req });
  },

  loadByEmail(req) {
    return AxiosClient.get(`api/users/allByEmail?email=${req}`);
  },

  exportAccount(req) {
    const reqUri = makeRequestSearch(req);

    return AxiosClient.get(`api/users/export?${reqUri}`, {
      responseType: "blob"
    });
  },

  exportAccountSearch(req) {
    const reqUri = makeRequestSearch(req);

    return AxiosClient.get(`api/users/export/search?${reqUri}`, {
      responseType: "blob"
    });
  },

  exportAccountMentee(id, req) {
    const reqUri = makeRequestSearch(req);

    return AxiosClient.get(`api/users/${id}/menteeGroups/export?${reqUri}`, {
      responseType: "blob"
    });
  },

  exportAccountMentor(id, req) {
    const reqUri = makeRequestSearch(req);

    return AxiosClient.get(`api/users/${id}/mentorGroups/export?${reqUri}`, {
      responseType: "blob"
    });
  },

  async importAccount(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    return AxiosClient.post(`api/users/import`, data, config);
  }
};

export default ErrorWrapper(UserApi);
