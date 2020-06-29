import React, { useEffect, useMemo, Fragment } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchBudget,
  fetchBudgetedCategories,
  addTransaction
} from "data/actions/budget.actions";
import { fetchAllCategories } from "data/actions/common.actions";
import { Grid } from "./Budget.css";
import { LoadingIndicator, Modal, Button } from "components";
import BudgetCategoryList from "pages/Budget/components/BudgetCategoryList";
import BudgetTransactionList from "./components/BudgetTransactionList";
import AddTransactionForm from "./components/AddTransactionForm";

const Budget = ({
  commonState,
  budgetState,
  fetchBudget,
  fetchBudgetedCategories,
  fetchAllCategories,
  allCategories,
  addTransaction,
  budget
}) => {
  const history = useHistory();
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
    fetchAllCategories();
  }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);
  const handleSubmitAddTransaction = values => {
    addTransaction({
      budgetId: budget.id,
      data: values
    }).then(() => {
      history.goBack();
    });
  };
  const isLoaded = useMemo(
    () =>
      !!commonState &&
      Object.keys(commonState).length === 0 &&
      Object.keys(budgetState).length === 0
        ? true
        : false,
    [commonState, budgetState]
  );
  return (
    <Fragment>
      <Grid>
        <section>
          {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}
        </section>
        <section>
          {isLoaded ? (
            <Fragment>
              <Button to="/budget/transactions/new">Add new transaction</Button>
              <BudgetTransactionList />
            </Fragment>
          ) : (
            <LoadingIndicator />
          )}
        </section>
      </Grid>
      <Switch>
        <Route path="/budget/transactions/new">
          <Modal>
            <AddTransactionForm
              onSubmit={handleSubmitAddTransaction}
              categories={allCategories}
              groupCategoriesBy="parentCategory.name"
            />
          </Modal>
        </Route>
      </Switch>
    </Fragment>
  );
};

export default connect(
  state => {
    return {
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
      allCategories: state.common.allCategories
    };
  },
  {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
    addTransaction
  }
)(Budget);
