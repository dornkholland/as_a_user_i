import { csrfFetch } from "./csrf";

const SET_WINDOW = "session/setWindow";

const setWindow = (window) => {
  return {
    type: SET_WINDOW,
    payload: window,
  };
};

export const windowToggle = (window) => (dispatch) => {
  const response = dispatch(setWindow(window));
  return response;
};

const windowReducer = (state = { windows: [] }, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_WINDOW:
      if (newState.windows.includes(action.payload)) {
        newState.windows = newState.windows.filter(
          (window) => window !== action.payload
        );
      } else {
        newState.windows.unshift(action.payload);
      }
      return newState;
    default:
      return newState;
  }
};
export default windowReducer;
