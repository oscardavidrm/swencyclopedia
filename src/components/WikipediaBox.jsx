import React, { Component } from "react";
import http from "../services/http";

class WikipediaBox extends Component {
  state = {
    path: "",
    data: {}
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.getData();
  }

  render() {
    const { title, extract } = this.state.data;
    return (
      <div style={{ overflow: "auto", maxHeight: "30rem" }} className='card'>
        <div className='card-body'>
          <h6 className='card-title'>
            <u>{title || "powered by Wikipedia"}</u>
          </h6>
          <p className='card-text'>{extract}</p>
        </div>
      </div>
    );
  }

  getData = async () => {
    let { query } = this.props;
    if (!query) return;

    const parsedQ = (query.name || query.title || "")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("%20");

    const { data: result } = await http.get(
      `${process.env.WIKI_URL}${parsedQ}`
    );

    if (!result || !result.query) return;

    const data = Object.keys(result.query.pages).map(page => {
      // const pattern = new RegExp(/\^==([0-9a-zA-Z]*?)==$/, "igm");
      // const titles = result.query.pages[page].extract.match(pattern);
      return {
        title: result.query.pages[page].title,
        extract: result.query.pages[page].extract || "Couldn't fetch any data"
      };
    })[0];

    this.setState({ data });
  };
}

export default WikipediaBox;
