import React, { Component } from "react";
import http from "../services/http";
import Card from "./Card.jsx";

class CardsGrid extends Component {
  state = {
    cards: [],
    seenIds: new Map(), //add some memo to improve app performance
    count: 0,
    prev: "",
    next: ""
  };

  renderGrid = cards => {
    return (
      <div className='container-fluid my-3 mx-auto'>
        <div className='card-columns'>
          {cards &&
            cards.map((card, i) => (
              <Card
                key={i}
                id={i}
                content={card}
                onCardSelect={this.handleCardSelect}
              />
            ))}
        </div>
      </div>
    );
  };

  handleCardSelect = async id => {
    console.log(this.state);
    const { cards, seenIds } = this.state;
    if (seenIds.has(id)) {
      //If info has been already requested, there's no need to query again
      console.log(cards);
      return this.setState({ cards }); //card info is already available in cards
    } else seenIds.set(id, id);

    const card = { ...cards[id] };

    const { data: homeworld } = await http.get(card.homeworld);

    let films = [];
    for (const f of card.films) {
      const { data: film } = await http.get(f);
      films.push(film.title);
    }
    let species = [];
    for (const s of card.species) {
      const { data: specie } = await http.get(s);
      species.push(specie.name);
    }
    let starships = [];
    for (const s of card.starships) {
      const { data: starship } = await http.get(s);
      starships.push(starship.name);
    }
    let vehicles = [];
    for (const v of card.vehicles) {
      const { data: vehicle } = await http.get(v);
      vehicles.push(vehicle.name);
    }

    card.films = films;
    card.species = species;
    card.starships = starships;
    card.vehicles = vehicles;
    card.homeworld = homeworld.name;
    cards[id] = { ...card };

    console.log(cards);
    this.setState({ cards });
  };
}

export default CardsGrid;
