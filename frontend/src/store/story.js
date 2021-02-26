import { csrfFetch } from "./csrf";

const LOAD = "story/load";

const loadStories = (stories) => {
  return {
    type: LOAD,
    payload: stories,
  };
};

export const getStoriesByWindow = ({ windowName, projectId }) => async (
  dispatch
) => {
  const response = await csrfFetch(
    `/api/projects/${projectId}/stories/${windowName}`
  );
  const data = await response.json();
  console.log(data);
  //return dispatch(loadStories(data));
};

const initialState = { stories: {} };
const storyReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    default:
      return state;
  }
};

export default storyReducer;
