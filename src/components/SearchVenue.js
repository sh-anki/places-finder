import React, { Component } from "react";

import { Form, FormGroup, FormControl, Button } from "react-bootstrap";

class SearchVenue extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      venues: []
    };
  }

  getVenueList(evt) {
    evt.preventDefault();
    const client_id = "T5CWZIKCV0CCSDUVJVREOXS0ERKLR0FPWOR0HXJJCWF0IS5N";
    const client_secret = "2VMV3YL0G5T0SNCRCLSU5TMSNUYA20WYZOMPEWD5MKJ54JIA";
    const url = "https://api.foursquare.com/v2/search/recommendations?";

    const params = {
      client_id,
      client_secret,
      limit: 3,
      query: "lunch",
      v: "20180827",
      near: this.state.location
    };

    console.log(url);
    fetch(url + new URLSearchParams(params), {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => this.props.setVenues(json.response.group.results))
      .catch(error => console.log("Failed: ", error));
    console.log("mapping", this.store);
  }

  onChangeLocation(value) {
    this.setState({ location: value });
    if (value === "") {
      this.props.setVenues([]);
    }
  }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <FormControl
            type="text"
            onChange={event => this.onChangeLocation(event.target.value)}
            placeholder="Enter your location"
          />
        </FormGroup>
        {"   "}
        <Button onClick={evt => this.getVenueList(evt)}>Search</Button>
      </Form>
    );
  }
}

export default SearchVenue;
