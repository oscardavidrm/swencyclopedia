import React, { Component } from "react";
import http from "../services/http";
import Card from "./Card.jsx";

class CardsGrid extends Component {
  state = {
    cards: [],
    seenIds: new Map(), //add some memo to improve app performance
    seenPaths: new Map(),
    count: 0,
    prev: null,
    next: `${process.env.API_URL}${this.props.path}/?page=2`,
    path: `${process.env.API_URL}${this.props.path}/?page=1`,
    page: 1
  };

  componentDidMount() {
    this.getData();
  }

  getData = async (path = this.state.path) => {
    const { seenPaths, cards } = this.state;
    if (path && seenPaths.has(path)) {
      const { p, n } = seenPaths.get(path);
      return this.setState({ prev: p, next: n });
    }

    const { data: response } = await http.get(path);
    const { results: newCards, count, previous: prev, next } = response;
    seenPaths.set(path, { p: prev, n: next });
    this.setState({ count, cards: [...cards, ...newCards], prev, next });
  };

  renderGrid = cards => {
    const { page } = this.state;
    const pageCards = cards.slice((page - 1) * 10, page * 10);
    return (
      <div className='container-fluid my-3'>
        <div className='card-columns'>
          {pageCards &&
            pageCards.map((card, i) => (
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
    const { cards, seenIds } = this.state;
    if (seenIds.has(id)) {
      //If info has been already requested, there's no need to query again
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

  handlePageChange = async (dir, page) => {
    const { prev, next } = this.state;
    if (dir === "next" && next) {
      this.getData(next);
      this.setState({ page: page + 1 });
    } else if (dir === "prev" && prev) {
      this.getData(prev);
      this.setState({ page: page > 1 ? page - 1 : page });
    }
  };
}

export default CardsGrid;
