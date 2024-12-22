import React from 'react';
import { Pagination } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const CustomPagination = ({ page, pageCount, onPageChange }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = pageCount;

    let startPage = Math.max(0, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pageCount - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            width: 28,
            height: 28,
            marginBottom: '-20px',
            alignItems: "center",
            margin: "5px",
            padding: "5px 10px",
            border: "none",
            borderRadius: page === i ? "50%" : '0',
            backgroundColor: page === i ? "#F9E3DA" : "white", // Highlight current page
            color: page === i ? "#E37547" : "black", // Highlight current page
            cursor: "pointer",
          }}
        >
          {i + 1}
        </button>
      );
    }
    return items;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div></div>
      <div>{renderPaginationItems()}</div>
      <div className="flex">
        <button
          className="flex justify-center items-center"
          onClick={() => handlePageChange(Math.max(0, page - 1))}
          disabled={page === 0}
          style={{
            width: 107,
            height: 38,
            marginRight: "10px",
            padding: "10px 10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
            backgroundColor: page === 0 ? "#eee" : "white",
            color: page === 0 ? "#aaa" : "black",
          }}
        >
          <KeyboardArrowLeftIcon />
          Previous
        </button>
        <button
          className="flex justify-center items-center"
          onClick={() => handlePageChange(Math.min(pageCount - 1, page + 1))}
          disabled={page >= pageCount - 1}
          style={{
            width: 84,
            height: 38,
            marginLeft: "10px",
            padding: "5px 10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
            backgroundColor: page >= pageCount - 1 ? "#eee" : "white",
            color: page >= pageCount - 1 ? "#aaa" : "black",
          }}
        >
          Next
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
