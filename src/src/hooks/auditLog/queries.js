import { useQuery } from "@tanstack/react-query";

import auditLogService from "service/auditLogService";

import { GetAuditLogByIdKey, GetAuditLogKey } from "./keys";

export const useGetAuditLog = (params) =>
  useQuery({
    queryKey: GetAuditLogKey(params),
    queryFn: () => {
      const defaultParams = {
        page: 0,
        pageSize: 10,
        userId: null
      };
      return auditLogService.getAuditLog({ ...defaultParams, ...params });
    },
    enabled: true,
    retry: 0
  });

export const useGetAuditLogById = (id, select) =>
  useQuery({
    queryKey: GetAuditLogByIdKey(id),
    queryFn: () => auditLogService.getAuditLogById(id),
    enabled: !!id,
    select
  });
