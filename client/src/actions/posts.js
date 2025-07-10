import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, ERROR } from '../constants/actionTypes';

import * as api from '../api/index.js';

// Helper function for error handling
const handleApiError = (error, dispatch) => {
  const errorMessage = error.response?.data?.message || error.message;
  dispatch({ type: ERROR, payload: errorMessage });
  throw error; // Re-throw for component-level error handling
};

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    handleApiError(error, dispatch);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    handleApiError(error, dispatch);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    handleApiError(error, dispatch);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    handleApiError(error, dispatch);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    dispatch({ type: END_LOADING });
  } catch (error) {
    handleApiError(error, dispatch);
  }
};
