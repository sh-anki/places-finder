export const SET_VENUES = "SET_VENUES";
export const SET_ID = "SET_ID";

export function setVenues(venues) {
  return {
    type: SET_VENUES,
    venues
  };
}
