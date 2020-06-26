import React, { Suspense, Fragment, useEffect } from "react";
import GlobalStyles from "./index.css";
import { connect } from "react-redux";
import theme from "utils/theme";
import { ThemeProvider } from "styled-components";
import {
  fetchBudget,
  fetchBudgetedCategories
} from "data/actions/budget.actions";
import {
  Navigation,
  LoadingIndicator,
  Wrapper,
  Button,
  HomePage
} from "components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = ({ budget, fetchBudget, fetchBudgetedCategories }) => {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
  }, [fetchBudget, fetchBudgetedCategories]);
  return (
    <Fragment>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            {
              content: "Homepage",
              to: "/"
            },
            { content: "Budget", to: "/budget" }
          ]}
          RightElement={
            <div>
              <Button>PL</Button>
              <Button>EN</Button>
            </div>
          }
        />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/budget">
              Budget
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </Fragment>
  );
};

const ConnectedApp = connect(
  state => {
    return {
      budget: state.budget.budget
    };
  },
  {
    fetchBudget,
    fetchBudgetedCategories
  }
)(App);

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </Suspense>
    </ThemeProvider>
  );
}

export default RootApp;
