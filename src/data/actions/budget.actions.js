import {
  BUDGET_GET_REQUEST,
  BUDGET_GET_FAILURE,
  BUDGET_GET_SUCCESS,
  BUDGETED_CATEGORIES_GET_REQUEST,
  BUDGETED_CATEGORIES_GET_SUCCESS,
  BUDGETED_CATEGORIES_GET_FAILURE
} from "data/constants";
import API from "data/fetch";

export const fetchBudget = id => async dispatch => {
  dispatch({
    type: BUDGET_GET_REQUEST
  });

  try {
    const response = await API.budget.fetchBudget(id);
    const data = await response.json();
    dispatch({
      type: BUDGET_GET_SUCCESS,
      payload: data
    });
  } catch {
    dispatch({
      type: BUDGET_GET_FAILURE
    });
  }
};

export const fetchBudgetedCategories = id => async dispatch => {
  dispatch({
    type: BUDGETED_CATEGORIES_GET_REQUEST
  });

  try {
    const response = await API.budget.fetchBudgetCagegories(id);
    const data = await response.json();
    dispatch({
      type: BUDGETED_CATEGORIES_GET_SUCCESS,
      payload: data
    });
  } catch {
    dispatch({
      type: BUDGETED_CATEGORIES_GET_FAILURE
    });
  }
};