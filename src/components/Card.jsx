import React from "react";

const Card = ({ id, content, onCardSelect }) => {
  return (
    <div onClick={() => onCardSelect(id)} className='card'>
      <div style={{ cursor: "pointer" }} className='card-body'>
        <h5 className='card-title'>{content.name}</h5>
      </div>
    </div>
  );
};

export default Card;
