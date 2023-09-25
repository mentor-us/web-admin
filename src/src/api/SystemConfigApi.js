import AxiosClient from "./AxiosClient";
import ErrorWrapper from "./ErrorWrapper";

const SystemConfigApi = {
  getAll() {
    return AxiosClient.get(`api/system-config/all`);
  },

  update(id, data) {
    return AxiosClient.patch(`api/system-config/${id}`, data);
  }
};

export default ErrorWrapper(SystemConfigApi);
