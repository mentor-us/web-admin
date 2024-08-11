import { makeRequestSearch } from "utils";

import { roleMemberEnum } from "utils/constants";

import AxiosClient from "./AxiosClient";

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
  },

  // User API
  async getGroupsInHomePage(type, page = 0, pageSize = 25) {
    const URL = `/api/groups/own?page=${page}&pageSize=${pageSize}&type=${type}`;
    const response = await AxiosClient.get(URL);
    return response.data.groups;
  },
  async getWorkspace(groupId) {
    const URL = `/api/groups/${groupId}/workspace`;
    const data = await AxiosClient.get(URL);
    if (data.returnCode === 204) {
      window.location.href = "/chat";
      return;
    }
    // eslint-disable-next-line consistent-return
    return data;
  },
  async getGroupDetail(groupId) {
    const URL = `/api/groups/${groupId}/detail`;
    const res = await AxiosClient.get(URL);
    if (res.returnCode === 104) {
      window.location.href = "/chat";
      return;
    }
    // eslint-disable-next-line consistent-return
    return res?.data;
  },
  async getGroupMembers(groupId) {
    const res = await AxiosClient.get(`/api/groups/${groupId}/members`);
    return res?.data;
  },

  pinMessage: async (groupId, messageId) => {
    const URL = `/api/groups/${groupId}/pin-message?messageId=${messageId}`;
    await AxiosClient.post(URL);
  },

  unpinMessage: async (groupId, messageId) => {
    const URL = `/api/groups/${groupId}/unpin-message?messageId=${messageId}`;
    await AxiosClient.post(URL);
  },
  updateAvatarGroup: async ({ groupId, image }) => {
    const UPDATE_AVATAR_URL = `/api/groups/${groupId}/avatar`;

    const formData = new FormData();
    console.log("image", image);

    formData.append("file", image);
    formData.append("groupId", groupId);

    try {
      await AxiosClient.post(UPDATE_AVATAR_URL, formData, {
        timeout: 20000,
        headers: {
          accept: "application/json",
          "content-type": "multipart/form-data"
        }
      });
    } catch (error) {
      console.log("GroupAPI.updateAvatarGroup:", error);
      return false;
    }

    return true;
  }
};

export default GroupApi;
