import React from "react";
import GlobalStyles from "./index.css";
import theme from "utils/theme";
import { ThemeProvider } from "styled-components";
import { Navigation } from "components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <ThemeProvider theme={theme}>
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
        />
        <Switch>
          <Route exact path="/">
            Homepage
          </Route>
          <Route exact path="/budget">
            Budget
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
