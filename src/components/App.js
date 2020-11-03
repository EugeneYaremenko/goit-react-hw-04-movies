import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';

import routes from '../routes';
import HomePage from '../pages/HomePage';
import MoviesPage from '../pages/MoviesPage';
import MovieDetailsPage from '../pages/MovieDetailsPage';

import Wrapper from './Wrapper/Wrapper';

export default class App extends Component {
  state = {};

  render() {
    return (
      <BrowserRouter>
        <Wrapper>
          <Switch>
            <Route path={routes.homePage} exact component={HomePage} />
            <Route path={routes.moviesPage} exact component={MoviesPage} />
            <Route
              path={routes.movieDetailsPage}
              component={MovieDetailsPage}
            />

            <Redirect to={routes.homePage} />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    );
  }
}
