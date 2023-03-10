import React from 'react';
import Pagination from '@mui/material/Pagination';

// eslint-disable-next-line react/prop-types
const AppPagination = ({ page, setPage, pageCount }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Pagination
        className="pagination"
        onChange={handleChange}
        count={pageCount}
        page={page}
        color="primary"
      />
    </div>
  );
};

export default AppPagination;
