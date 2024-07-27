import AxiosClient from "./AxiosClient";

const AUDIT_LOG_URL = "/api/audits";

const AuditLogApi = {
  getAuditLog: (params) => AxiosClient.get(AUDIT_LOG_URL, { params }),
  getAuditLogById: (id) => AxiosClient.get(`${AUDIT_LOG_URL}/${id}`)
};

export default AuditLogApi;
