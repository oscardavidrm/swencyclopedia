import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ headers }) => {
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <Link
        style={{ cursor: "pointer" }}
        key='title'
        to='/'
        className='navbar-brand mb-0 h1'
      >
        Star Wars Encyclopædia
      </Link>
      {headers &&
        headers.map(header => (
          <Link
            style={{ cursor: "pointer" }}
            key={header}
            to='/'
            className='navbar-brand mb-0 h1'
          >
            {header}
          </Link>
        ))}
    </nav>
  );
};

export default NavBar;
