import { csrfFetch } from "./csrf";

const LOAD = "comment/load";
const SET_COMMENT = "comment/set";

const loadComments = (comments) => {
  return {
    type: LOAD,
    payload: comments,
  };
};

const setComment = (comments) => {
  return {
    type: SET_COMMENT,
    payload: comments,
  };
};

export const getComments = ({ storyId, projectId }) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/projects/${projectId}/stories/${storyId}/comments`
  );
  const data = await response.json();
  return dispatch(loadComments(data));
};

export const addComment = ({ storyId, projectId, description }) => async (
  dispatch
) => {
  const response = await csrfFetch(
    `/api/projects/${projectId}/stories/${storyId}/comments`,
    {
      method: "POST",

      body: JSON.stringify({
        description,
      }),
    }
  );
  const data = await response.json();
  return dispatch(setComment(data.comment));
};

const initialState = { comments: {} };

const commentReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD:
      if (action.payload.length) {
        const storyId = action.payload[0].storyId;
        newState.comments[storyId] = action.payload;
      }
      return newState;
    case SET_COMMENT:
      const storyId = action.payload.storyId;
      if (!newState.comments[storyId]) {
        newState.comments[storyId] = [];
      }
      newState.comments[storyId].push(action.payload);
      return newState;
    default:
      return state;
  }
};

export default commentReducer;
