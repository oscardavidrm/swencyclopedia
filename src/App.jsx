import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/Navbar.jsx";
import ResourcesBar from "./components/ResourcesBar.jsx";
import People from "./components/People.jsx";
import Species from "./components/Species.jsx";
import Planets from "./components/Planets.jsx";
import Starships from "./components/Starships.jsx";
import Vehicles from "./components/Vehicles.jsx";
import EmptyGrid from "./components/utils/EmptyGrid.jsx";

class App extends Component {
  state = {
    current: "/",
    count: 0,
    query: ""
  };

  render() {
    const sharedProps = { loading: true, onMount: this.handleResourceCount };
    return (
      <Router>
        {this.renderNavBar()}
        <div className='container'>
          <div className='row d-flex justify-content-end'>
            <nav className='navbar pb-0'>
              <span className='badge badge-pill badge-danger'>
                Found {this.state.count} entries in the database.
              </span>
            </nav>
          </div>
          <div className='row'>
            {this.renderResourcesBar([
              "people",
              "species",
              "planets",
              "starships",
              "vehicles"
            ])}
            {this.state.current === "/" && <EmptyGrid />}
            <Route
              exact
              path='/people'
              render={() => <People path='/people' {...sharedProps} />}
            />
            <Route
              exact
              path='/species'
              render={() => <Species path='/species' {...sharedProps} />}
            />
            <Route
              exact
              path='/planets'
              render={() => <Planets path='/planets' {...sharedProps} />}
            />
            <Route
              exact
              path='/starships'
              render={() => <Starships path='/starships' {...sharedProps} />}
            />
            <Route
              exact
              path='/vehicles'
              render={() => <Vehicles path='/vehicles' {...sharedProps} />}
            />
          </div>
        </div>
      </Router>
    );
  }

  renderNavBar = headers => {
    return <NavBar headers={headers} />;
  };

  renderResourcesBar = headers => {
    return (
      <div className='col-2 my-3'>
        {/* render navigation bar */}
        <ResourcesBar
          headers={headers}
          onHeaderSelect={this.handleHeaderSelect}
        />
      </div>
    );
  };

  handleHeaderSelect = ({ header: current }) => {
    this.setState({ current });
  };

  handleResourceCount = count => {
    this.setState({ count });
  };
}

export default App;
