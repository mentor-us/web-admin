import { makeRequestSearch } from "utils";

import AxiosClient from "./AxiosClient";

const UserApi = {
  findById(userId) {
    return AxiosClient.get(`api/users/${userId}`).then((response) => response.data);
  },

  findByIds(userIds) {
    return Promise.all(userIds.map(this.findById)).then((res) => res.filter(Boolean));
  },

  getAllUser() {
    return AxiosClient.get(`api/users/all`).then((response) => {
      return response.success ? response.data : [];
    });
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

  enableAccount(req) {
    return AxiosClient.patch(`api/users/enable`, req);
  },

  search(req) {
    return AxiosClient.get(`api/users/find?${makeRequestSearch(req)}`);
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
    return AxiosClient.get(`api/users/export?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  exportAccountSearch(req) {
    return AxiosClient.get(`api/users/export/search?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  exportAccountMentee(id, req) {
    return AxiosClient.get(`api/users/${id}/menteeGroups/export?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  exportAccountMentor(id, req) {
    return AxiosClient.get(`api/users/${id}/mentorGroups/export?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  importAccount(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    return AxiosClient.post(`api/users/import`, data, config);
  },
  updateProfile(data) {
    return AxiosClient.patch(`api/users/${data.id}/profile`, data);
  },

  getMe() {
    return AxiosClient.get("api/users/me");
  },
  updateAvatar: async ({ file }) => {
    const URL = "api/users/avatar";
    const formData = new FormData();
    formData.append("file", file);
    try {
      await AxiosClient.post(URL, formData, {
        timeout: 15000,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      });
    } catch (error) {
      return false;
    }
    return true;
  },
  getMentees(req) {
    return AxiosClient.get(`/api/users/mentees`, {
      params: {
        page: req.page,
        pageSize: req.pageSize,
        query: req.query
      }
    });
  }
};

export default UserApi;
