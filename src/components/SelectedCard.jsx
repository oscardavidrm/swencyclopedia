import React from "react";

const SelectedCard = ({ card: content }) => {
  return (
    <React.Fragment>
      {content && (
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'>{content.name}</h4>
            <p className='card-text font-weight-light'>
              origin: {content.homeworld}
            </p>
            <p className='card-text font-weight-light'>
              {content.species && `species: ${content.species}`}
            </p>
            <p className='card-text font-weight-light'>
              birth: {content.birth_year}
            </p>
            <p className='card-text font-weight-light'>
              gender: {content.gender}
            </p>
            <p className='card-text font-weight-light'>
              height: {content.height}
            </p>
            <p className='card-text font-weight-light'>mass: {content.mass}</p>
            <p className='card-text font-weight-light'>
              {content.vehicles.length > 0 && `vehicles: ${content.vehicles}`}
            </p>
            <p className='card-text font-weight-light'>
              {content.starships.length > 0 &&
                `starships: ${content.starships}`}
            </p>
            <p className='card-text font-weight-light'>
              {content.films.length > 0 && `films: ${content.films}`}
            </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SelectedCard;
