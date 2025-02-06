import React from "react";
import Pagination from "@mui/material/Pagination";

const PaginationControls = ({ totalPages, goToPage }) => {
  return (
    <Pagination
      count={totalPages}
      variant="outlined"
      onChange={(e, number) => goToPage(number)}
    />
  );
};

export default PaginationControls;
