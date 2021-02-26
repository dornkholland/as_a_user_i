import { csrfFetch } from "./csrf";

const LOAD = "story/load";

const UPDATE_STORY = "story/update";

const loadStories = (stories) => {
  return {
    type: LOAD,
    payload: stories,
  };
};

const setStory = (story) => {
  return {
    type: UPDATE_STORY,
    payload: story,
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

export const updateStory = ({
  projectId,
  storyId,
  storyName,
  storyType,
  storySize,
  storyStatus,
  storyDescription,
  windowName,
}) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/projects/${projectId}/stories/${windowName}/${storyId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        storyName,
        storyType,
        storySize,
        storyStatus,
        storyDescription,
      }),
    }
  );
  const data = await response.json();
  return dispatch(setStory(data.story));
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
    case UPDATE_STORY:
      const projectId = action.payload.projectId;
      const windowName = action.payload.window;
      newState.stories[projectId] = { ...newState.stories[projectId] };
      newState.stories[projectId][windowName] = newState.stories[projectId][
        windowName
      ].map((story) => {
        if (story.id !== action.payload.id) {
          return story;
        } else {
          return action.payload;
        }
      });
      return newState;

    default:
      return state;
  }
};

export default storyReducer;
