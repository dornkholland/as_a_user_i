import { csrfFetch } from "./csrf";

const LOAD = "story/load";

const SET_STORY = "story/set";

const REMOVE_STORY = "story/remove";

const MOVE_STORY = "story/move";

const loadStories = (stories) => {
  return {
    type: LOAD,
    payload: stories,
  };
};

const setStory = (story) => {
  return {
    type: SET_STORY,
    payload: story,
  };
};

const removeStory = (story) => {
  return {
    type: REMOVE_STORY,
    payload: story,
  };
};

const moveStory = (coords) => {
  return {
    type: MOVE_STORY,
    payload: coords,
  };
};

export const storyReorder = ({ coords, projectId }) => (dispatch) => {
  const coordsObj = {
    story: JSON.parse(coords.draggableId),
    sourceId: coords.source.index,
    destId: coords.destination.index,
    windowName: coords.destination.droppableId,
    projectId,
  };
  const response = dispatch(moveStory(coordsObj));
  return response;
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

export const getStories = ({ projectId }) => async (dispatch) => {
  const response = await csrfFetch(`/api/projects/${projectId}/stories/`);
  const data = await response.json();
  return dispatch(loadStories(data));
};

export const createStory = ({
  projectId,
  storyName,
  storyType,
  storySize,
  storyStatus,
  storyDescription,
  windowName,
}) => async (dispatch) => {
  const response = await csrfFetch(`/api/projects/${projectId}/stories/`, {
    method: "POST",
    body: JSON.stringify({
      storyName,
      storyType,
      storySize,
      storyStatus,
      storyDescription,
      windowName,
    }),
  });
  const data = await response.json();
  return dispatch(setStory(data.story));
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
  previousWindow,
}) => async (dispatch) => {
  const toDelete = { id: storyId, window: previousWindow, projectId };
  dispatch(removeStory(toDelete));

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
  data.story.previousWindow = previousWindow;
  return dispatch(setStory(data.story));
};

export const deleteStory = ({ projectId, storyId }) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/projects/${projectId}/stories/${storyId}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return dispatch(removeStory(data.deleted));
};

const initialState = { stories: {} };
const storyReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD:
      //normalize stories by id in object on project page load
      if (action.payload.stories.length) {
        action.payload.stories.map((ele) => {
          newState.stories[ele.id] = ele;
        });
      }
      return newState;

    case SET_STORY:
      const stories = newState.stories;
      //check if update or creation
      stories[action.payload.id] = action.payload;
      return newState;
    case REMOVE_STORY:
      delete newState.stories[action.payload.id];
      return newState;

    case MOVE_STORY:
      //if (toRemove) {
      //  newState.stories[projectId][windowName].splice(
      //    action.payload.destId,
      //    0,
      //    toRemove
      //  );
      //}
      return newState;
    default:
      return state;
  }
};

export default storyReducer;
