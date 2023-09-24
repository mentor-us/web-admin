import AxiosClient from "./AxiosClient";

export default class SystemConfigApi {
  static async getAll() {
    try {
      return await AxiosClient.get(`api/system-config/all`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(id, data) {
    try {
      return await AxiosClient.patch(`api/system-config/${id}`, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
