import React from "react";
import "./images/loader.gif";

const Loader = () => {
  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center'>
        <img src='/images/loader.gif' alt='loading...' />
      </div>
    </div>
  );
};

export default Loader;
