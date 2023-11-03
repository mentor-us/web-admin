import React from "react";
import { useSelector } from "react-redux";
import { Card, Grid } from "@mui/material";
import PropTypes from "prop-types";

import statisticDetailTableData from "pages/StatisticDetail/data/statisticDetailTableData";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";
import DataTable from "components/Tables/DataTable";

import {
  getAllStatisticDetailSearchSelector,
  getIsSearchStatisticDetailSelector,
  getStatisticDetailColumnHeadersSelector,
  getStatisticDetailTableSelector
} from "redux/statisticDetail/selector";

import ExportDetailButton from "../ExportDetailButton";
import SearchBox from "../Search";
// import { getStatisticDetail } from "redux/statisticDetail/slice";
// import ImportComboBox from "../ImportComboBox";

function StatisticDetailTable({ groupId }) {
  /// --------------------- Khai báo Biến, State -------------
  // const dispatch = useDispatch();
  const statisticData = useSelector(getStatisticDetailTableSelector);

  const isSearch = useSelector(getIsSearchStatisticDetailSelector);
  const searchStatistics = useSelector(getAllStatisticDetailSearchSelector);

  const columnHeaders = useSelector(getStatisticDetailColumnHeadersSelector);
  const isShowColumns = columnHeaders.filter((item) => item.isShow);

  const tableData = !isSearch
    ? statisticDetailTableData(statisticData, columnHeaders)
    : statisticDetailTableData(searchStatistics, columnHeaders);

  /// --------------------------------------------------------
  /// --------------------- Các hàm thêm ---------------------

  const isDisabledExport = () => {
    return isSearch ? searchStatistics.length === 0 : statisticData.length === 0;
  };

  /// --------------------------------------------------------
  /// --------------------- Các hàm event ---------------------

  // useEffect(() => {
  //   dispatch(getStatisticDetail(id));
  // }, [id]);
  const renderTable = () => {
    return (
      <DataTable
        table={tableData}
        isSorted
        entriesPerPage
        showTotalEntries={false}
        noEndBorder={false}
        headerFilterType="statistic-detail"
        minWidth={isShowColumns.length > 5 ? `${isShowColumns.length * 220}px` : "100%"}
      />
    );
  };

  return (
    <MDBox mt={2}>
      <Card>
        <MDBox p={3} pb={0}>
          <MDBox
            mb={2}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography variant="h5">Danh sách hoạt động thành viên</MDTypography>
            <ExportDetailButton groupId={groupId} isDisabled={isDisabledExport()} />
          </MDBox>
          <SearchBox groupId={groupId} />
          <Grid container mt={2}>
            <Grid item xs={12}>
              {renderTable()}
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}
StatisticDetailTable.propTypes = {
  groupId: PropTypes.string.isRequired
};
export default StatisticDetailTable;
