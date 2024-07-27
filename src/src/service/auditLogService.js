import AuditLogApi from "api/AuditLogApi";

import ErrorWrapper from "./ErrorServiceWrapper";

const auditLogService = {
  getAuditLog: (param) => AuditLogApi.getAuditLog(param),
  getAuditLogById: (id) => AuditLogApi.getAuditLogById(id)
};

export default ErrorWrapper(auditLogService);
