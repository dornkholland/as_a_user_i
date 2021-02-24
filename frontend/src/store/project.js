import { csrfFetch } from "./csrf";
const initialState = { projects: { owned: [], collab: [] } };

const SET_PROJECT = "project/setProject";
const ADD_PROJECT = "project/addProject";
const REMOVE_PROJECT = "project/removeProject";

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

const removeProject = (project) => {
  return {
    type: REMOVE_PROJECT,
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

/* create a project */
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

export const editProject = (project) => async (dispatch) => {
  const { projectId, projectName } = project;
  const response = await csrfFetch(`/api/projects/${projectId}`, {
    method: "PATCH",
    body: JSON.stringify({
      projectName,
    }),
  });
  const data = await response.json();
  return dispatch(setProject(data.projects));
};

export const deleteProject = (project) => async (dispatch) => {
  const { id } = project;
  const response = await csrfFetch(`/api/projects/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
  return dispatch(removeProject(Number(data.project)));
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
      const temp = Object.assign({}, newState.projects, newOwned);
      const copyState = Object.assign({}, newState, { projects: temp });
      return copyState;
    case REMOVE_PROJECT:
      newState = Object.assign({}, state);
      const toDelete = action.payload;
      const owned = newState.projects.owned.filter(
        (project) => project.id !== toDelete
      );
      const temp1 = Object.assign({}, newState.projects, { owned });
      const copyStateRemove = Object.assign({}, newState, { projects: temp1 });
      return copyStateRemove;
    default:
      return state;
  }
};

export default projectsReducer;
