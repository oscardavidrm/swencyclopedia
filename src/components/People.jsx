import React from "react";
import CardsGrid from "./CardsGrid.jsx";
import SelectedCard from "./SelectedCard.jsx";

class People extends CardsGrid {
  render() {
    const { count, cards, selectedCardId } = this.state;
    return (
      <React.Fragment>
        {this.renderNavBar()}

        <div className='container'>
          <div className='row justify-content-center'>
            {this.renderResourcesBar(["people"])}
            {this.renderGrid(cards)}
            <div className='col-3 my-3'>
              {/* render selected card */}
              <SelectedCard card={cards[selectedCardId]} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default People;
