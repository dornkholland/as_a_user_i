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
  return dispatch(loadStories(data));
};

const initialState = { stories: {} };
const storyReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD:
      if (action.payload.stories.length) {
        const projectId = action.payload.stories[0].projectId;
        const windowName = action.payload.stories[0].window;
        newState.stories[projectId] = { ...newState.stories[projectId] };
        newState.stories[projectId][windowName] = action.payload.stories;
      }
      return newState;
    default:
      return state;
  }
};

export default storyReducer;
