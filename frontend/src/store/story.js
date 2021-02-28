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
      if (action.payload.stories.length) {
        const projectId = action.payload.stories[0].projectId;
        const windowName = action.payload.stories[0].window;
        newState.stories[projectId] = { ...newState.stories[projectId] };
        newState.stories[projectId][windowName] = action.payload.stories;
      }
      return newState;
    case SET_STORY:
      const projectId = action.payload.projectId;
      const windowName = action.payload.window;
      newState.stories[projectId] = { ...newState.stories[projectId] };
      if (!newState.stories[projectId][windowName]) {
        newState.stories[projectId][windowName] = [];
      }
      const stories = newState.stories[projectId][windowName];
      if (stories.find((story) => story.id === action.payload.id)) {
        newState.stories[projectId][windowName] = newState.stories[projectId][
          windowName
        ].map((story) => {
          if (story.id !== action.payload.id) {
            return story;
          } else {
            return action.payload;
          }
        });
      } else {
        const projectId = action.payload.projectId;
        const windowName = action.payload.window;
        const previousWindow = action.payload.previousWindow;
        if (previousWindow) {
          newState.stories[projectId][previousWindow] = newState.stories[
            projectId
          ][previousWindow].filter((story) => story.id !== action.payload.id);
        }
        newState.stories[projectId][windowName].unshift(action.payload);
      }
      return newState;
    case REMOVE_STORY:
      if (true) {
        const projectId = action.payload.projectId;
        const windowName = action.payload.window;
        newState.stories[projectId][windowName] = newState.stories[projectId][
          windowName
        ].filter((story) => story.id !== action.payload.id);
      }
      return newState;

    case MOVE_STORY:
      if (true) {
        const projectId = action.payload.projectId;
        const windowName = action.payload.windowName;
        const story = action.payload.story;
        const storyArray = newState.stories[projectId][windowName];
        let toRemove = storyArray.find((element) => element.id === story.id);
        console.log(story);
        console.log(newState.stories[projectId][story.window]);
        if (toRemove) {
          newState.stories[projectId][windowName] = storyArray.filter(
            (ele) => ele.id !== story.id
          );
          newState.stories[projectId][windowName].splice(
            action.payload.destId,
            0,
            toRemove
          );
        }
      }
      return newState;
    default:
      return state;
  }
};

export default storyReducer;
