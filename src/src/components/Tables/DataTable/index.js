import { useMemo, useState } from "react";
// react-table components
import { useAsyncDebounce, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import Autocomplete from "@mui/material/Autocomplete";
import Icon from "@mui/material/Icon";
// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import { ITEMS_PER_PAGE } from "config";

import HeaderFilter from "components/HeaderFilter";
// Material Dashboard 2 React components
import MDBox from "components/MDComponents/MDBox";
import MDInput from "components/MDComponents/MDInput";
import MDPagination from "components/MDComponents/MDPagination";
import MDTypography from "components/MDComponents/MDTypography";

import DataTableBodyCell from "./DataTableBodyCell";
// Material Dashboard 2 React example components
import DataTableHeadCell from "./DataTableHeadCell";
import "./style.css";

function DataTable({
  canSearch,
  entriesPerPage,
  table,
  pagination,
  isSorted,
  noEndBorder,
  minWidth,
  headerFilterType
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : ITEMS_PER_PAGE;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: defaultValue || ITEMS_PER_PAGE } },
    useGlobalFilter,
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
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }
  } = tableInstance;

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);
  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
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
  //     return (
  //       <CustomPagination
  //         totalPages={customPaginationInfo.totalPages}
  //         pageIndex={customPaginationInfo.currentPage}
  //         handleChangePage={customPaginationInfo.handleChangePage}
  //       />
  //     );
  //   }
  //   return (
  //     pageOptions.length > 1 && (
  //       <MDPagination
  //         variant={pagination.variant ? pagination.variant : "gradient"}
  //         color={pagination.color ? pagination.color : "info"}
  //       >
  //         <MDPagination item disabled={!canPreviousPage} onClick={() => previousPage()}>
  //           <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
  //         </MDPagination>
  //         {renderPagination.length > 6 ? (
  //           <MDBox width="5rem" mx={1}>
  //             {/* <MDInput
  //               inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
  //               value={customizedPageOptions[pageIndex]}
  //               onChange={(handleInputPagination, handleInputPaginationValue)}
  //             /> */}
  //           </MDBox>
  //         ) : (
  //           renderPagination
  //         )}
  //         <MDPagination item disabled={!canNextPage} onClick={() => nextPage()}>
  //           <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
  //         </MDPagination>
  //       </MDPagination>
  //     )
  //   );
  // };

  return (
    <>
      <MDBox py={0.5} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="caption" sx={{ fontSize: "0.85rem" }}>
          Số lượng kết quả: <span style={{ fontWeight: "bold" }}>{rows.length}</span>{" "}
        </MDTypography>
        {canSearch && (
          <MDBox width="12rem">
            <MDInput
              placeholder="Tìm kiếm"
              value={search || ""}
              size="small"
              fullWidth
              onChange={(e) => {
                setSearch(e.target.value);
                onSearchChange(e.target.value);
              }}
            />
          </MDBox>
        )}
        {headerFilterType && <HeaderFilter type={headerFilterType} />}
      </MDBox>
      <TableContainer
        sx={{
          boxShadow: "none",
          borderRadius: "unset!important",
          width: "100%"
        }}
      >
        <Table {...getTableProps()} sx={{ minWidth, overflowX: "auto" }}>
          <MDBox component="thead">
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {/* <DataTableHeadCell width="35px" align="center" sorted={false}>
                STT
              </DataTableHeadCell> */}
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
      >
        {entriesPerPage && (
          <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            {entriesPerPage && (
              <MDBox display="flex" alignItems="center">
                <Autocomplete
                  noOptionsText="Trống"
                  disableClearable
                  value={pageSize.toString()}
                  options={entries}
                  onChange={(event, newValue) => {
                    setEntriesPerPage(parseInt(newValue, 10));
                  }}
                  size="small"
                  sx={{ width: "5rem" }}
                  renderInput={(params) => <MDInput {...params} />}
                />
                <MDTypography variant="caption" color="secondary">
                  &nbsp;&nbsp;mục mỗi trang
                </MDTypography>
              </MDBox>
            )}
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            <MDPagination item disabled={!canPreviousPage} onClick={() => previousPage()}>
              <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
            </MDPagination>
            {renderPagination.length > 7 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            <MDPagination item disabled={!canNextPage} onClick={() => nextPage()}>
              <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
            </MDPagination>
          </MDPagination>
        )}
      </MDBox>
    </>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  canSearch: false,
  entriesPerPage: { defaultValue: ITEMS_PER_PAGE, entries: [5, 10, 15, 20, 25] },
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
  minWidth: "100%",
  headerFilterType: false
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number)
    }),
    PropTypes.bool
  ]),
  canSearch: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.instanceOf(Array)).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light"
    ])
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  minWidth: PropTypes.string,
  headerFilterType: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default DataTable;
