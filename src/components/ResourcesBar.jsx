import React from "react";
import { Link } from "react-router-dom";

const ResourcesBar = ({ headers, onHeaderSelect }) => {
  return (
    <nav className='list-group'>
      {headers.map(header => (
        <Link
          onClick={() => onHeaderSelect(header)}
          style={{ cursor: "pointer" }}
          key={header}
          className='list-group-item list-group-item-action'
          to={`/${header}`}
        >
          {header}
        </Link>
      ))}
    </nav>
  );
};

export default ResourcesBar;
