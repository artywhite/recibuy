import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import RecipesPage from 'modules/recipes/components/RecipesPage';
import RecipePage from 'modules/recipes/components/RecipePage';
import IndexPage from 'modules/index/IndexPage';
import BasketPage from 'modules/basket/components/BasketPage';
import ShoppingListPage from 'modules/shopping/components/ShoppingListPage';

import { ROUTES } from 'common/constants/routes';

const NoMatch = () => <h2>404</h2>;

const AppRouter = () => (
  <Switch>
    <Route path={ROUTES.INDEX} exact component={RecipesPage} />
    <Route path={ROUTES.RECIPES} exact component={RecipesPage} />
    <Route path={ROUTES.RECIPES_NEW} exact isNew component={RecipePage} />
    <Route path={`${ROUTES.RECIPES}/:recipeId`} exact component={RecipePage} />
    <Route path={ROUTES.BASKET} exact component={BasketPage} />
    <Route path={ROUTES.SHOPPING_LIST} exact component={ShoppingListPage} />
    <Route component={NoMatch} />
  </Switch>
);

export default AppRouter;
