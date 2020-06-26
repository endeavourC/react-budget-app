export const fetchBudget = id => {
  const promise = fetch(
    `${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`
  );

  return promise;
};

export const fetchBudgetCagegories = id => {
  const promise = fetch(
    `${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`
  );

  return promise;
};
