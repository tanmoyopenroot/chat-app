import React from 'react';
import decode from 'jwt-decode';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from '../containers/Home';
import Register from '../containers/Register';
import Login from '../containers/Login';
import ViewTeams from '../containers/ViewTeams';

const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    decode(token);
    decode(refreshToken);

    return true;
  } catch (err) {
    return false;
  }
};

const PrivateRoute = ({ children, path }) => {
  const render = () => (
    isAuthenticated()
      ? children
      : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
  );

  return (
    <Route
      path={path}
      render={render}
    />
  );
};

const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path="/"
        exact
        component={Home}
      />
      <Route
        path="/register"
        component={Register}
      />
      <Route
        path="/login"
        component={Login}
      />
      <PrivateRoute path="/teams/:teamId/:channelId?">
        <ViewTeams />
      </PrivateRoute>
    </Switch>
  </BrowserRouter>
);

export default AppRoutes;
