import React from "react";

const Card = ({ id, selectedClass, content, onCardSelect }) => {
  return (
    <div
      onClick={() => onCardSelect(id)}
      className={`card ${selectedClass.border}`}
    >
      <div
        style={{ cursor: "pointer" }}
        className={`card-body ${selectedClass.text}`}
      >
        <h5 className='card-title'>{content.name}</h5>
      </div>
    </div>
  );
};

export default Card;
