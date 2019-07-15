import React from "react";
import CardsGrid from "./CardsGrid.jsx";
import SelectedCard from "./SelectedCard.jsx";

class Species extends CardsGrid {
  render() {
    const { cards, seenIds, selectedCardId } = this.state;
    return (
      <React.Fragment>
        {this.renderGrid(cards)}
        <div className='col-3 my-3'>
          {/* render selected card */}
          <SelectedCard
            cards={cards}
            seenIds={seenIds}
            selectedCardId={selectedCardId}
            loading={true}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Species;
