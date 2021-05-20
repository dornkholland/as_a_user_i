import { csrfFetch } from "./csrf";

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

export const addCollaborator = ({ projectId, collaboratorId }) => async (
  dispatch
) => {
  const response = await csrfFetch(
    `/api/projects/${projectId}/collaborator/${collaboratorId}`,
    { method: "POST" }
  );
  const data = await response.json();
  return data;
};

/* get projects and set as current state thunk */
export const getProjects = () => async (dispatch) => {
  const response = await csrfFetch("/api/projects");
  const data = await response.json();
  dispatch(setProject(data.projects));
  return response;
};

export const getProjectById = ({ projectId }) => async (dispatch) => {
  const response = await csrfFetch(`/api/projects/${projectId}`);
  const data = await response.json();
  return data.project.name;
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
  console.log(data);
  dispatch(addProject(data.newProject));
  return data.newProject;
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

const initialState = { projects: { owned: [], collab: [] } };
const projectsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_PROJECT:
      newState = Object.assign({}, state);
      newState.projects = action.payload;
      return newState;
    case ADD_PROJECT:
      newState = JSON.parse(JSON.stringify(state));
      newState.projects.owned.unshift(action.payload);
      return newState;
    case REMOVE_PROJECT:
      newState = JSON.parse(JSON.stringify(state));
      newState.projects.owned = newState.projects.owned.filter(
        (project) => project.id !== action.payload
      );
      return newState;
    default:
      return state;
  }
};

export default projectsReducer;
