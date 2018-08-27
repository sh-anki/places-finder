import React, { Component } from "react";
import SearchVenue from "./components/SearchVenue";

class App extends Component {
  render() {
    console.log("hrer: ", this.props);
    return (
      <div className="App">
        <h2 className="app-heading">Venue Finder</h2>
        <SearchVenue />
        {console.log("MYYY STATE: ", this.props)}
      </div>
    );
  }
}

export default App;
