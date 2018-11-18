import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import RecipesPage from 'modules/recipes/components/RecipesPage';
import IndexPage from 'modules/index/IndexPage';

import { ROUTES } from 'common/constants/routes';

const NoMatch = () => <h2>404</h2>;

const AppRouter = () => (
  <Switch>
    <Route path={ROUTES.INDEX} exact component={IndexPage} />
    <Route path={ROUTES.RECIPES} component={RecipesPage} />
    <Route component={NoMatch} />
  </Switch>
);

export default AppRouter;
