import { makeRequestSearch } from "utils";

import AxiosClient from "./AxiosClient";

const GroupCategoryApi = {
  all() {
    return AxiosClient.get(`api/group-categories`).then((response) => response.data);
  },

  findById(categoryID) {
    return AxiosClient.get(`api/group-categories/${categoryID}`).then((response) => response.data);
  },

  add(data) {
    return AxiosClient.post(`api/group-categories`, data);
  },

  update(categoryID, data) {
    return AxiosClient.patch(`api/group-categories/${categoryID}`, data);
  },

  delete(categoryID, req) {
    return AxiosClient.delete(`api/group-categories/${categoryID}`, {
      data: req
    });
  },

  deleteMultiple(req) {
    return AxiosClient.delete(`api/group-categories`, {
      data: req
    });
  },

  search(req) {
    return AxiosClient.get(`api/group-categories/find?${makeRequestSearch(req)}`);
  },

  exportGroupCategory(req) {
    return AxiosClient.get(`api/group-categories/export?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  },

  getPermissions() {
    return AxiosClient.get(`api/group-categories/permissions`);
  },

  exportGroupCategorySearch(req) {
    return AxiosClient.get(`api/group-categories/export/search?${makeRequestSearch(req)}`, {
      responseType: "blob"
    });
  }
};

export default GroupCategoryApi;
