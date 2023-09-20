import { API_URL } from "config";
import AxiosClient from "./AxiosClient";

export default class SystemConfigApi {
  static async getAll() {
    try {
      return await AxiosClient.get(`${API_URL}api/system-config/all`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(id, data) {
    try {
      return await AxiosClient.patch(`${API_URL}api/system-config/${id}`, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
