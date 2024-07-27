import { useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { Autocomplete } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";

import CustomPagination from "components/CustomPagination";
import HeaderFilter from "components/HeaderFilter";
import MDBox from "components/MDComponents/MDBox";
import MDInput from "components/MDComponents/MDInput";
import MDTypography from "components/MDComponents/MDTypography";

import DataTableBodyCell from "./DataTableBodyCell";
import DataTableHeadCell from "./DataTableHeadCell";
import "./style.css";

function DataTableCustom({
  table,
  isSorted,
  noEndBorder,
  customPaginationInfo,
  minWidth,
  headerFilterType
}) {
  const {
    totalPages,
    totalItems,
    currentPage,
    itemsPerPage,
    handleChangeItemsPerPage,
    handleChangePage
  } = useMemo(() => customPaginationInfo, [customPaginationInfo]);

  const entries = ["5", "10", "15", "20", "25"];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: itemsPerPage } },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    setPageSize,
    state: { pageSize }
  } = tableInstance;

  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && !column.notSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted && !column.notSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  return (
    <>
      <MDBox py={0.5} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="caption" sx={{ fontSize: "0.85rem" }}>
          Số lượng kết quả: <span style={{ fontWeight: "bold" }}>{totalItems || rows.length}</span>{" "}
        </MDTypography>
        {headerFilterType && <HeaderFilter type={headerFilterType} />}
      </MDBox>
      <TableContainer sx={{ width: "100%", boxShadow: "none", borderRadius: "unset!important" }}>
        <Table {...getTableProps()} sx={{ minWidth, overflowX: "auto" }}>
          <MDBox component="thead">
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  (column) =>
                    column.isShow && (
                      <DataTableHeadCell
                        {...column.getHeaderProps(
                          isSorted &&
                            !column.notSorted &&
                            column.getSortByToggleProps({ title: `Sắp xếp theo ${column.Header}` })
                        )}
                        width={column.width ? column.width : "auto"}
                        align={column.align ? column.align : "left"}
                        sorted={setSortedValue(column)}
                      >
                        {column.render("Header")}
                      </DataTableHeadCell>
                    )
                )}
              </TableRow>
            ))}
          </MDBox>
          <TableBody {...getTableBodyProps()}>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell align="left" colSpan={columns.length + 1}>
                  <MDTypography variant="caption" fontWeight="medium">
                    Không tìm thấy dữ liệu
                  </MDTypography>
                </TableCell>
              </TableRow>
            ) : (
              page.map((row, key) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map(
                      (cell) =>
                        cell.column.isShow && (
                          <DataTableBodyCell
                            noBorder={noEndBorder && rows.length - 1 === key}
                            align={cell.column.align ? cell.column.align : "left"}
                            type={cell.column.type}
                            info={cell.row.original}
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </DataTableBodyCell>
                        )
                    )}
                  </TableRow>
                );
              })
            )}
            {minWidth !== "100%" && (
              <TableRow>
                <DataTableBodyCell noBorder>
                  <MDBox pb={1} />
                </DataTableBodyCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        pr={3}
      >
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox display="flex" alignItems="center">
            <Autocomplete
              noOptionsText="Trống"
              disableClearable
              value={pageSize.toString()}
              options={entries}
              onChange={(event, newValue) => {
                handleChangeItemsPerPage(parseInt(newValue, 10));
                setPageSize(parseInt(newValue, 10));
              }}
              size="small"
              sx={{ width: "5rem" }}
              renderInput={(params) => <MDInput {...params} />}
            />
            <MDTypography variant="caption" color="secondary">
              &nbsp;&nbsp;mục mỗi trang
            </MDTypography>
          </MDBox>
        </MDBox>

        <CustomPagination
          totalPages={totalPages}
          pageIndex={currentPage}
          handleChangePage={handleChangePage}
        />
      </MDBox>
    </>
  );
}

// Setting default values for the props of DataTableCustom
DataTableCustom.defaultProps = {
  isSorted: true,
  noEndBorder: false,
  minWidth: "100%",
  headerFilterType: false
};

// Typechecking props for the DataTableCustom
DataTableCustom.propTypes = {
  table: PropTypes.objectOf(PropTypes.instanceOf(Array)).isRequired,
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  customPaginationInfo: PropTypes.shape({
    totalPages: PropTypes.number,
    totalItems: PropTypes.number,
    currentPage: PropTypes.number,
    itemsPerPage: PropTypes.number,
    handleChangeItemsPerPage: PropTypes.func,
    handleChangePage: PropTypes.func
  }).isRequired,
  minWidth: PropTypes.string,
  headerFilterType: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default DataTableCustom;
