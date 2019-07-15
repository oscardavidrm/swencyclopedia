import React from "react";

const Loader = () => {
  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center'>
        <img src={require("./images/loader.gif")} alt='loading...' />
      </div>
    </div>
  );
};

export default Loader;
