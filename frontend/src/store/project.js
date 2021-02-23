import { csrfFetch } from "./csrf";
const initialState = { projects: null };

const SET_PROJECT = "project/setProject";

/*set project action creator */
const setProject = (project) => {
  return {
    type: SET_PROJECT,
    payload: project,
  };
};

/* get projects and set as current state thunk */
export const getProjects = () => async (dispatch) => {
  const response = await csrfFetch("/api/projects");
  const data = await response.json();
  dispatch(setProject(data.project));
  return response;
};

const projectsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_PROJECT:
      newState = Object.assign({}, state);
      newState.project = action.payload;
      return newState;
  }
};

export default projectsReducer;
