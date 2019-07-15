import React, { Component } from "react";
import http from "../services/http";
import PaginationSelector from "./PaginationSelector.jsx";
import Card from "./Card.jsx";
import Loader from "./utils/Loader.jsx";
import WikipediaBox from "./WikipediaBox.jsx";

class CardsGrid extends Component {
  state = {
    cards: [],
    seenIds: new Map(), //add some memo to improve app performance
    seenPaths: new Map(),
    count: 0,
    selectedCardId: null,
    prev: null,
    next: `${process.env.API_URL}${this.props.path}/?page=2`,
    path: `${process.env.API_URL}${this.props.path}/?page=1`,
    page: 1,
    loading: this.props.loading
  };

  componentDidMount() {
    this.getData();
  }

  getData = async (path = this.state.path) => {
    this.setState({ loading: true });
    const { seenPaths, cards } = this.state;
    const { onMount } = this.props;

    if (path && seenPaths.has(path)) {
      const { p, n } = seenPaths.get(path);
      return this.setState({ prev: p, next: n, loading: false });
    }

    const { data: response } = await http.get(path);
    const { results: newCards, count, previous: prev, next } = response;
    seenPaths.set(path, { p: prev, n: next });

    onMount(count); //pass data to parent
    this.setState({
      count,
      cards: [...cards, ...newCards],
      prev,
      next,
      loading: false
    });
  };

  renderGrid = cards => {
    const { selectedCardId, prev, next, page, loading } = this.state;
    const pageCards = cards.slice((page - 1) * 10, page * 10);
    return (
      <div className='col-7 my-3'>
        {/* render main grid bar */}
        {loading && <Loader />}
        {!loading && (
          <div className='container-fluid'>
            <div className='card-columns'>
              {pageCards &&
                pageCards.map((card, i) => (
                  <Card
                    key={i + (page - 1) * 10}
                    id={i + (page - 1) * 10}
                    selectedClass={
                      i + (page - 1) * 10 === selectedCardId
                        ? { border: "border-danger", text: "text-danger" }
                        : ""
                    }
                    content={card}
                    onCardSelect={this.onCardSelect}
                  />
                ))}
            </div>
          </div>
        )}
        <PaginationSelector
          prev={prev}
          next={next}
          page={page}
          onPageChange={this.handlePageChange}
        />
        <WikipediaBox query={cards[selectedCardId]} />
      </div>
    );
  };

  onCardSelect = id => {
    this.setState({ selectedCardId: id });
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
