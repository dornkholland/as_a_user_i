import { csrfFetch } from "./csrf";

const SET_WINDOW = "session/setWindow";
const MOVE_WINDOW = "session/moveWindow";

const setWindow = (windowItem) => {
  return {
    type: SET_WINDOW,
    payload: windowItem,
  };
};

const moveWindow = (coords) => {
  return {
    type: MOVE_WINDOW,
    payload: coords,
  };
};

export const windowToggle = (windowItem) => (dispatch) => {
  const response = dispatch(setWindow(windowItem));
  return response;
};

export const windowReorder = (coords) => (dispatch) => {
  const coordsObj = {
    dragName: coords.draggableId,
    sourceId: coords.source.index,
    destId: coords.destination.index,
  };
  const response = dispatch(moveWindow(coordsObj));
  return response;
};

const windowReducer = (state = { windows: [] }, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_WINDOW:
      if (newState.windows.includes(action.payload)) {
        newState.windows = newState.windows.filter(
          (windowItem) => windowItem !== action.payload
        );
      } else {
        newState.windows.unshift(action.payload);
      }
      return newState;
    case MOVE_WINDOW:
      newState.windows = newState.windows.filter(
        (windowItem) => windowItem !== action.payload.dragName
      );
      newState.windows.splice(
        action.payload.destId,
        0,
        action.payload.dragName
      );
      return newState;
    default:
      return newState;
  }
};
export default windowReducer;
