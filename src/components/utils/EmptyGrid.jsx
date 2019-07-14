import React from "react";

const EmptyGrid = () => {
  return (
    <div className='col-7 my-3 d-flex justify-content-center'>
      <div className='card p-5'>
        <h6>Welcome to the official Star Wars Encyclopædia</h6> <br />
        <p>
          This wiki contains excellent insights on some of <br />
          your favorite characters from the acclaimed <br />
          <b>Star Wars Saga</b>. Feel free to dive into the stunning <br />
          catalogs available to your right. <br />
          <br />
        </p>
        <address>
          <b>Hapi Company</b> <br />
          Nuevo León, México.
        </address>
      </div>
    </div>
  );
};

export default EmptyGrid;
