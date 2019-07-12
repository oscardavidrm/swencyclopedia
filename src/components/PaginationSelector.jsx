import React from "react";

const PaginationSelector = ({ prev, next, page, onPageChange }) => {
  return (
    <ul className='pagination pagination-lg'>
      <li
        onClick={() => onPageChange("prev", page)}
        className={`page-item ${!prev && "disabled"}`}
      >
        <a className='page-link' href='#' aria-disabled='true'>
          prev
        </a>
      </li>
      <li
        onClick={() => onPageChange("next", page)}
        className={`page-item ${!next && "disabled"}`}
      >
        <a className='page-link' href='#'>
          next
        </a>
      </li>
    </ul>
  );
};

export default PaginationSelector;
