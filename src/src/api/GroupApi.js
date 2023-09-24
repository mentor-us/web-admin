import { roleMemberEnum } from "utils/constants";
import { makeRequestSearch } from "utils";

import AxiosClient from "./AxiosClient";

export default class GroupApi {
  static async all(req) {
    const { page, size } = req;
    try {
      return await AxiosClient.get(`api/groups?type=admin&page=${page}&pageSize=${size}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findById(id) {
    try {
      return await AxiosClient.get(`api/groups/${id}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async add(data) {
    try {
      return await AxiosClient.post(`api/groups`, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async search(req) {
    const reqUri = makeRequestSearch(req);

    const url = `api/groups/find?${reqUri}`;
    try {
      return await AxiosClient.get(url);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async importSheet(file) {
    const data = new FormData();
    data.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    let response;
    try {
      response = await AxiosClient.post(`api/groups/import`, data, config);
    } catch (error) {
      throw new Error(error.message);
    }

    return response;
  }

  static async addDetail(id, data, type) {
    const url =
      type === roleMemberEnum.mentee ? `api/groups/${id}/mentees` : `api/groups/${id}/mentors`;
    try {
      return await AxiosClient.post(url, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteDetail(id, idUser, type) {
    const url =
      type === roleMemberEnum.mentee
        ? `api/groups/${id}/mentees/${idUser}`
        : `api/groups/${id}/mentors/${idUser}`;
    try {
      return await AxiosClient.delete(url);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async promoteToMentor(id, idUser) {
    const url = `api/groups/${id}/mentors/${idUser}`;
    try {
      return await AxiosClient.patch(url);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async demoteToMentee(id, idUser) {
    const url = `api/groups/${id}/mentees/${idUser}`;
    try {
      return await AxiosClient.patch(url);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(id, data) {
    try {
      return await AxiosClient.patch(`api/groups/${id}`, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(id) {
    try {
      return await AxiosClient.delete(`api/groups/${id}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getTemplate() {
    try {
      const response = await AxiosClient.get(`api/groups/import`, {
        responseType: "blob"
      });

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteMultiple(req) {
    try {
      const response = await AxiosClient.delete(`api/groups`, { data: req });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async disableGroup(req) {
    try {
      const response = await AxiosClient.patch(`api/groups/disable`, req);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async enableGroup(req) {
    try {
      const response = await AxiosClient.patch(`api/groups/enable`, req);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportGroup(req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/groups/export?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportGroupMentee(id, req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/groups/${id}/mentees/export?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportGroupMentor(id, req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/groups/${id}/mentors/export?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportGroupSearch(req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`api/groups/export/search?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
