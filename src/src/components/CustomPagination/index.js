import React from "react";
import { Pagination } from "@mui/material";
import { PropTypes } from "prop-types";

import "./styles.css";

function CustomPagination({ totalPages, pageIndex, handleChangePage }) {
  /// --------------------- Khai báo Biến, State -------------
  const handleChange = (event, value) => {
    handleChangePage(value - 1);
  };

  return totalPages > 1 ? (
    <Pagination
      count={totalPages}
      color="info"
      page={pageIndex}
      onChange={handleChange}
      sx={{ mt: 1, fontWeight: "400!important" }}
      size="medium"
    />
  ) : (
    <div />
  );
}

CustomPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired
};

export default CustomPagination;
