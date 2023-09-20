import { API_URL } from "config";
import { makeRequestSearch } from "utils";
import AxiosClient from "./AxiosClient";

export default class GroupCategoryApi {
  static async all() {
    let categories = [];
    try {
      const response = await AxiosClient.get(`${API_URL}api/group-categories`);
      categories = response.data;
    } catch (error) {
      throw new Error(error.message);
    }
    return categories;
  }

  static async findById(categoryID) {
    try {
      const response = await AxiosClient.get(`${API_URL}api/group-categories/${categoryID}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async add(data) {
    try {
      return await AxiosClient.post(`${API_URL}api/group-categories`, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(categoryID, data) {
    try {
      return await AxiosClient.patch(`${API_URL}api/group-categories/${categoryID}`, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(categoryID, req) {
    try {
      return await AxiosClient.delete(`${API_URL}api/group-categories/${categoryID}`, {
        data: req
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteMultiple(req) {
    try {
      return await AxiosClient.delete(`${API_URL}api/group-categories`, {
        data: req
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async search(req) {
    const reqUri = makeRequestSearch(req);

    const url = `${API_URL}api/group-categories/find?${reqUri}`;
    try {
      return await AxiosClient.get(url);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportGroupCategory(req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`${API_URL}api/group-categories/export?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getPermissions() {
    try {
      const response = await AxiosClient.get(`${API_URL}api/group-categories/permissions`);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async exportGroupCategorySearch(req) {
    const reqUri = makeRequestSearch(req);
    try {
      return await AxiosClient.get(`${API_URL}api/group-categories/export/search?${reqUri}`, {
        responseType: "blob"
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
