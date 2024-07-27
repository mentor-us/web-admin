/* eslint-disable simple-import-sort/imports */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { useDispatch } from "react-redux";
import { Avatar, Card, Grid, Stack } from "@mui/material";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import { translateToVNmeseByKey } from "routes";
import { NavLink, useLocation } from "react-router-dom";

// import FilterBox from "./components/FilterBox/filterBox";
// import StatisticNumberAndChart from "./components/StatisticNumberAndChart";
// import StatisticTable from "./components/StatisticTable";
import DataTableCustom from "components/Tables/DataTable/DataTableCustom";
import useAuditLogStore, { actionTypeMap, domainTypeMap } from "hooks/client/useAuditLogStore.ts";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo } from "react";
import { ROUTE_URL } from "utils/constants";
import { ErrorAlert } from "components/SweetAlert";
import { useGetAuditLog } from "hooks/auditLog/queries";
import { useMentorUs } from "hooks";
import { setLoading } from "context";
import SearchBox from "./components/Search";

function AuditLog() {
  const location = useLocation();
  const [, dispatchContext] = useMentorUs();
  const routePathKey = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

  /// --------------------- Khai báo Biến, State -------------
  // const dispatch = useDispatch();
  const {
    auditLogData,
    columnHeaders,
    currentPageSearch,
    itemsPerPage,
    setGradeData,
    isSubmitSearch,
    searchParams,
    setState
  } = useAuditLogStore();
  const {
    data: auditLog,
    isLoading,
    isSuccess
  } = useGetAuditLog({
    ...searchParams,
    page: currentPageSearch,
    pageSize: itemsPerPage
  });

  useEffect(() => {
    if (isLoading) {
      setLoading(dispatchContext, true);
    } else if (isSuccess) {
      setLoading(dispatchContext, false);
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    setState("auditLogData", auditLog);
  }, [auditLog]);

  const handleChangeItemsPerPage = async (value) => {
    try {
      setState("itemsPerPage", value);
      setState("currentPageSearch", 0);
      // setState("isSubmitSearch", true);
    } catch (error) {
      ErrorAlert(error.message);
    }
  };

  const handleChangePage = async (value) => {
    try {
      setState("currentPageSearch", value);
      setState("isSubmitSearch", true);
    } catch (error) {
      ErrorAlert(error.message);
    }
  };

  const renderUser = useCallback((user) => {
    return (
      <NavLink to={`${ROUTE_URL.ACCOUNT_DETAIL}/${user.id}`}>
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
          <Avatar alt={user.name} src={user.avatar} sx={{ width: 32, height: 32 }} />
          <MDTypography variant="button" color="info" sx={{ fontWeight: "400" }}>
            {user.name}
          </MDTypography>
        </Stack>
      </NavLink>
    );
  }, []);

  const dataTransform = useMemo(() => {
    return auditLogData
      ? auditLogData?.data?.map((item, index) => {
          const numberOrder = (auditLogData?.page || 0) * (auditLogData?.pageSize || 1) + index + 1;
          return {
            no: numberOrder,
            createdDate: dayjs(item.createdDate).format("DD/MM/YYYY"),
            user: renderUser(item.user),
            domain: domainTypeMap[item.domain],
            action: actionTypeMap[item.action],
            detail: item.detail
          };
        })
      : [];
  }, [auditLogData]);

  const renderTable = () => {
    return (
      <DataTableCustom
        table={{
          columns: columnHeaders,
          rows: dataTransform
        }}
        isSorted
        noEndBorder={false}
        customPaginationInfo={{
          currentPage: currentPageSearch + 1,
          totalPages: auditLogData?.totalPages || 0,
          totalItems: auditLogData?.totalCounts || 0,
          itemsPerPage,
          handleChangeItemsPerPage,
          handleChangePage
        }}
        headerFilterType="audit-log"
      />
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={1}>
        <SearchBox />
        <Grid mt={2} container>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3} pb={0}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <MDTypography variant="h5" gutterBottom>
                    {translateToVNmeseByKey(routePathKey)}
                  </MDTypography>
                </MDBox>
                <Grid container>
                  <Grid item xs={12}>
                    {auditLog && renderTable()}
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AuditLog;
