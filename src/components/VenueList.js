import React, { Component } from "react";
import { connect } from "react-redux";
import fromPairs from "lodash/fromPairs";
import { Form, Button } from "react-bootstrap";

class VenueList extends Component {
  state = {
    participants: [],
    frequent: {},
    winner: false
  };

  participantInput(idx) {
    return (
      <input
        placeholder="Type Here"
        className="table-input"
        onChange={evt => this.setInputValue(evt.target.value, idx, "name")}
        type="text"
      />
    );
  }

  setInputValue = (value, key, field) => {
    const domain = "participants";
    this.state[domain][key][field] = value;
    this.setState(fromPairs([domain], [this.state[domain]]));
    field === "votes" && this.mostVoted();
  };

  addParticipant() {
    console.log("PARTICIPANT PROPS: ", this.props);
    this.setState(({ participants }) => ({
      participants: participants.concat({ name: "", votes: [] })
    }));
  }

  mostVoted() {
    const { participants } = this.state;

    const calculateMostFrequent = participants.reduce(
      function(o, { votes: { venue: s } }) {
        o.freq[s] = (o.freq[s] || 0) + 1;
        if (!o.freq[o.most] || o.freq[s] > o.freq[o.most]) o.most = s;
        return o;
      },
      { freq: {}, most: "" }
    );
    this.setState({
      frequent: calculateMostFrequent
    });
  }

  checkEven() {
    const { frequent } = this.state;
    //const pullVotes = participants.map(p => p.votes.value);
    const obj = frequent.freq;
    const keys = Object.keys(obj);
    const largest = Math.max.apply(null, keys.map(x => obj[x]));
    const result = keys.reduce((result, key) => {
      if (obj[key] === largest) {
        result.push(key);
      }
      return result;
    }, []);
    return result;
  }

  render() {
    const { participants, frequent } = this.state;
    if (this.props.venues.length > 0) {
      return (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Participant</th>
                {this.props.venues.map((venue, index) => {
                  return (
                    <th key={index}>
                      <br />
                      <a
                        href={
                          venue.snippets.items[0].detail.object.canonicalUrl
                        }
                        target="_blank"
                      >
                        {venue.venue.name}
                      </a>
                      <br />
                      <p className="th-cat">
                        {" "}
                        {venue.venue.categories[0].name}{" "}
                      </p>
                      {frequent.most === venue.venue.name &&
                        (participants.length === 1 ||
                          (participants.length > 1 &&
                            frequent.freq[venue.venue.name] > 1)) &&
                        this.checkEven().length < 2 && (
                          <p className="winner">Winner</p>
                        )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {this.props.venues.length
                ? participants.map((participant, key) => {
                    return (
                      <tr key={key}>
                        <td>{this.participantInput(key)}</td>
                        {this.props.venues.map((venue, index) => {
                          return (
                            <td
                              className="tableCell"
                              key={index}
                              onClick={() =>
                                this.setInputValue(
                                  { venue: venue.venue.name, key },
                                  key,
                                  "votes"
                                )
                              }
                            >
                              {participants[key].votes.key === key &&
                              participants[key].votes.venue === venue.venue.name
                                ? "Selected"
                                : "Click to Vote"}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          <Form inline>
            <Button
              className="add-button"
              onClick={() => this.addParticipant()}
            >
              Add Participant
            </Button>
          </Form>
        </div>
      );
    } else return null;
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  null
)(VenueList);
