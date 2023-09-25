import { roleMemberEnum } from "utils/constants";
import { makeRequestSearch } from "utils";

import AxiosClient from "./AxiosClient";
import ErrorWrapper from "./ErrorWrapper";

const GroupApi = {
  all(req) {
    const { page, size } = req;
    return AxiosClient.get(`api/groups?type=admin&page=${page}&pageSize=${size}`);
  },

  findById(id) {
    return AxiosClient.get(`api/groups/${id}`);
  },

  add(data) {
    return AxiosClient.post(`api/groups`, data);
  },

  search(req) {
    return AxiosClient.get(`api/groups/find?${makeRequestSearch(req)}`);
  },

  importSheet(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    return AxiosClient.post(`api/groups/import`, data, config);
  },

  addDetail(id, data, type) {
    return AxiosClient.post(
      `api/groups/${id}/${type === roleMemberEnum.mentee ? "mentees" : "mentors"}`,
      data
    );
  },

  deleteDetail(id, idUser, type) {
    return AxiosClient.delete(
      `api/groups/${id}/${type === roleMemberEnum.mentee ? "mentees" : "mentors"}/${idUser}`
    );
  },

  promoteToMentor(id, idUser) {
    return AxiosClient.patch(`api/groups/${id}/mentors/${idUser}`);
  },

  demoteToMentee(id, idUser) {
    return AxiosClient.patch(`api/groups/${id}/mentees/${idUser}`);
  },

  update(id, data) {
    return AxiosClient.patch(`api/groups/${id}`, data);
  },

  delete(id) {
    return AxiosClient.delete(`api/groups/${id}`);
  },

  getTemplate() {
    return AxiosClient.get(`api/groups/import`, {
      responseType: "blob"
    });
  },

  deleteMultiple(req) {
    return AxiosClient.delete(`api/groups`, { data: req });
  },

  disableGroup(req) {
    return AxiosClient.patch(`api/groups/disable`, req);
  },

  enableGroup(req) {
    return AxiosClient.patch(`api/groups/enable`, req);
  },

  exportGroup(req) {
    return AxiosClient.get(`api/groups/export?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  async exportGroupMentee(id, req) {
    return AxiosClient.get(`api/groups/${id}/mentees/export?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  exportGroupMentor(id, req) {
    return AxiosClient.get(`api/groups/${id}/mentors/export?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  exportGroupSearch(req) {
    return AxiosClient.get(`api/groups/export/search?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  }
};

export default ErrorWrapper(GroupApi);
