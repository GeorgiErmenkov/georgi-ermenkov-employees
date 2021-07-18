import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';

import Home from "./containers/Home/Home";

import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";

const NotFound = () => {
  return <div>NotFound</div>;
};

const DashboardRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <MainLayout>
          <Component {...matchProps} />
        </MainLayout>
      )}
    />
  );
};

const EmptyRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <EmptyLayout>
          <Component {...matchProps} />
        </EmptyLayout>
      )}
    />
  );
};

export default function App() {

  const theme = {
    typography: {
      useNextVariants: true,
    },
    palette: {
      contrastThreshold: 3,
      tonalOffset: 0.2,
      type: 'dark'
    }
  };

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <div style={{ height: "100vh" }}>
        <Router>
          <Switch>
            <DashboardRoute exact path="/" component={Home} />
            <EmptyRoute component={NotFound} />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};