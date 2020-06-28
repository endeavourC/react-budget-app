import React, { Suspense, Fragment } from "react";
import GlobalStyles from "./index.css";
import theme from "utils/theme";
import { ThemeProvider } from "styled-components";
import { Navigation, LoadingIndicator, Wrapper, Button } from "components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import BudgetPage from "pages/Budget";

const App = () => {
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
              <BudgetPage />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </Fragment>
  );
};

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingIndicator />}>
        <App />
      </Suspense>
    </ThemeProvider>
  );
}

export default RootApp;
