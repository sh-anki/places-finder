import React, { Component } from "react";
import SearchVenue from "./components/SearchVenue";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Venue Finder</h2>
        <SearchVenue />
      </div>
    );
  }
}

export default App;
