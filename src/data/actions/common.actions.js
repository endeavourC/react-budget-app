import {
  ALL_CATEGORIES_GET_REQUEST,
  ALL_CATEGORIES_GET_SUCCESS,
  ALL_CATEGORIES_GET_FAILURE
} from "data/constants";
import API from "data/fetch";

export const fetchAllCategories = id => async dispatch => {
  dispatch({
    type: ALL_CATEGORIES_GET_REQUEST
  });

  try {
    const response = await API.common.fetchAllCategories();
    const data = await response.json();
    dispatch({
      type: ALL_CATEGORIES_GET_SUCCESS,
      payload: data
    });
  } catch {
    dispatch({
      type: ALL_CATEGORIES_GET_FAILURE
    });
  }
};
