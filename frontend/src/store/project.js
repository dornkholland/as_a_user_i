import { csrfFetch } from "./csrf";
const initialState = { projects: null };

const SET_PROJECT = "project/setProject";
const ADD_PROJECT = "project/addProject";

/*set project action creator */
const setProject = (project) => {
  return {
    type: SET_PROJECT,
    payload: project,
  };
};
const addProject = (project) => {
  return {
    type: ADD_PROJECT,
    payload: project,
  };
};

/* get projects and set as current state thunk */
export const getProjects = () => async (dispatch) => {
  const response = await csrfFetch("/api/projects");
  const data = await response.json();
  dispatch(setProject(data.projects));
  return response;
};

export const createProject = (project) => async (dispatch) => {
  const { projectName } = project;
  const response = await csrfFetch("/api/projects", {
    method: "POST",
    body: JSON.stringify({
      projectName,
    }),
  });
  const data = await response.json();
  dispatch(addProject(data.newProject));
  return response;
};

const projectsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_PROJECT:
      newState = Object.assign({}, state);
      newState.projects = action.payload;
      return newState;
    case ADD_PROJECT:
      newState = Object.assign({}, state);
      const newOwned = {
        owned: [...newState.projects.owned, action.payload],
      };
      const temp = Object.assign({}, newState.projects.collab, newOwned);
      const copyState = Object.assign({}, newState, { projects: temp });
      return copyState;
    default:
      return state;
  }
};

export default projectsReducer;
