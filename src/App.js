import React, { Component } from "react";
import SearchVenue from "./components/SearchVenue";
import VenueList from "./components/VenueList";

class App extends Component {
  render() {
    console.log("hrer: ", this.props);
    return (
      <div className="App">
        <h2 className="app-heading">Venue Finder</h2>
        <SearchVenue />
        {console.log("MYYY STATE: ", this.props)}
        <VenueList />
      </div>
    );
  }
}

export default App;
