import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post("/api/project", project);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const updateProject = (project, history) => async (dispatch) => {
  try {
    await axios.put("/api/project", project);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  const res = await axios.get("/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const getProject = (projectIdentifier, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/${projectIdentifier}`);

    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    history.push("/dashboard");
  }
};

export const deleteProject = (projectIdentifier) => async (dispatch) => {
  if (window.confirm("Are you sure to delete this project?")) {
    await axios.delete(`/api/project/${projectIdentifier}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: projectIdentifier,
    });
  }
};
