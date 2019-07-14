import React from "react";
import gif from "./images/loader.gif";

const Loader = () => {
  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center'>
        <img src={gif} alt='loading...' />
      </div>
    </div>
  );
};

export default Loader;
