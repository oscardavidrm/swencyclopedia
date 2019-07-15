import React, { Component } from "react";
import http from "../services/http";
import Loader from "./utils/Loader.jsx";

class SelectedCard extends Component {
  state = {
    loading: null
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ loading: true });
      this.handleSelectedCard();
    }
  }

  render() {
    const { cards, selectedCardId: id } = this.props;
    const { loading } = this.state;
    const card = cards[id];
    return (
      <React.Fragment>
        {loading && <Loader />}
        {!loading && card && (
          <div id='selectedCard' className='card'>
            <div className='card-body'>
              <h4 className='card-title'>{card.name || card.title}</h4>
              {Object.keys(card).map(key => (
                <p key={key} className='card-text font-weight-light'>
                  {key}: {card[key]}
                </p>
              ))}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

  handleSelectedCard = async () => {
    const { cards, seenIds, selectedCardId: id } = this.props;
    if (seenIds.has(id)) {
      //If info has been already requested, there's no need to query again
      return this.setState({ loading: false }); //card info is already available in cards
    } else seenIds.set(id, id);

    const card = { ...cards[id] };
    for (const key in card) {
      if (key === "created" || key === "edited" || key === "url") {
        delete card[key];
        continue;
      }

      if (typeof card[key] === "object") {
        //this means it contains an endpoint
        let data = [];
        for (const d of card[key]) {
          const { data: res } = await http.get(d);
          data.push(res.title || res.name);
        }

        card[key] = data;
        continue;
      }

      if (card[key].indexOf("https") !== -1) {
        const { data: res } = await http.get(card[key]);
        card[key] = res.title || res.name;
        continue;
      }
    }

    cards[id] = { ...card };
    this.setState({ loading: false });
  };
}

export default SelectedCard;
