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

export const storyReorder = ({ coords, projectId }) => async (dispatch) => {
  const coordsObj = {
    story: JSON.parse(coords.draggableId),
    sourceId: coords.source.index,
    destId: coords.destination.index,
    windowName: coords.destination.droppableId,
    projectId,
  };
  const response = dispatch(moveStory(coordsObj));
  const request = await csrfFetch(`/api/projects/${projectId}/stories/move/`, {
    method: "PUT",
    body: JSON.stringify({
      coordsObj,
    }),
  });
  const data = await request.json();

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
  index,
}) => async (dispatch) => {
  console.log(index);
  const response = await csrfFetch(`/api/projects/${projectId}/stories/`, {
    method: "POST",
    body: JSON.stringify({
      storyName,
      storyType,
      storySize,
      storyStatus,
      storyDescription,
      windowName,
      index,
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
  console.log(data);
  return dispatch(removeStory(data.story));
};

const initialState = { stories: {} };
const storyReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD:
      //normalize stories by id in object on project page load
      const tempState = { stories: {} };
      if (action.payload.stories.length) {
        action.payload.stories.map((ele) => {
          tempState.stories[ele.id] = ele;
        });
      }
      return tempState;

    case SET_STORY:
      const stories = newState.stories;
      //check if update or creation
      stories[action.payload.id] = action.payload;
      return newState;

    case REMOVE_STORY:
      let deletedStory = newState.stories[action.payload.id];

      delete newState.stories[action.payload.id];

      //update indices of other stories after deleting
      Object.values(newState.stories)
        .filter(
          (story) =>
            story.window === deletedStory.window &&
            story.index > deletedStory.index &&
            story.projectId === deletedStory.projectId
        )
        .forEach((story) => newState.stories[story.id].index--);

      return newState;

    case MOVE_STORY:
      //update index of story

      const storyToMove = newState.stories[action.payload.story.id];
      const oldWindow = storyToMove.window;
      newState.stories[storyToMove.id].index = action.payload.destId;
      newState.stories[storyToMove.id].window = action.payload.windowName;

      // update indices of old window
      Object.values(newState.stories)
        .filter((story) => {
          return (
            story.window === oldWindow &&
            story.index > action.payload.sourceId &&
            story.id !== storyToMove.id
          );
        })
        .forEach((story) => {
          console.log(story);
          newState.stories[story.id].index--;
          console.log(newState.stories[story.id]);
        });

      // update indices of new window
      Object.values(newState.stories)
        .filter((story) => {
          return (
            story.window === action.payload.windowName &&
            story.index >= action.payload.destId &&
            story.id !== storyToMove.id
          );
        })

        .forEach((story) => {
          console.log(story);
          newState.stories[story.id].index++;
          console.log(newState.stories[story.id]);
        });

      return newState;
    default:
      return state;
  }
};

export default storyReducer;
