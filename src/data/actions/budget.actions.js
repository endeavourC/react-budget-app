import {
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  BUDGET_GET_FAILURE,
  BUDGETED_CATEGORIES_GET_REQUEST,
  BUDGETED_CATEGORIES_GET_SUCCESS,
  BUDGETED_CATEGORIES_GET_FAILURE,
  SET_SELECTED_PARENT_CATEGORY_ID,
  BUDGET_TRANSACTION_ADD,
  BUDGET_TRANSACTION_ADD_REQUEST,
  BUDGET_TRANSACTION_ADD_SUCCESS,
  BUDGET_TRANSACTION_ADD_FAILURE
} from "data/constants";
import API from "data/fetch";

export const fetchBudget = id => async dispatch => {
  // const promise = await API.budget.fetchBudget(id);
  // dispatch({
  //   type: BUDGET_GET_REQUEST,
  //   promise
  // });

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

export const selectParentCategory = id => {
  return {
    type: SET_SELECTED_PARENT_CATEGORY_ID,
    payload: id
  };
};

export const addTransaction = ({ budgetId, data }) => async dispatch => {
  dispatch({
    type: BUDGET_TRANSACTION_ADD_REQUEST
  });
  try {
    const promise = await API.budget.addTransaction({
      budgetId,
      data
    });
    const response = await promise.json();
    console.log(response);
    dispatch({
      type: BUDGET_TRANSACTION_ADD_SUCCESS,
      payload: response,
      successMessage: "Transaction has been added!"
    });
  } catch {
    dispatch({
      type: BUDGET_TRANSACTION_ADD_FAILURE
    });
  }
};
