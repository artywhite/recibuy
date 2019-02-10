import get from 'lodash/get';
import includes from 'lodash/includes';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { addToBasket, removeFromBasket } from 'modules/basket/actions';
import { getBasketRecipesIds } from 'modules/basket/selectors';

import { getIngredientsMap } from 'modules/ingredients/selectors';
import { getUnitsMap } from 'modules/units/selectors';
import { ROUTES } from 'common/constants/routes';

import './index.scss';

const propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  ingredientsMap: PropTypes.shape({}).isRequired,
  unitsMap: PropTypes.shape({}).isRequired,

  boundActions: PropTypes.shape({
    addToBasket: PropTypes.func.isRequired,
    removeFromBasket: PropTypes.func.isRequired,
  }).isRequired,

  basketRecipesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function RecipesList(props) {
  const {
    recipes, ingredientsMap, unitsMap, boundActions, basketRecipesIds,
  } = props;
  const isEmptyList = recipes.length === 0;

  return (
    <div className="recipes-list-wrapper">
      <div>{isEmptyList && <div>There are no recipes yet</div>}</div>

      <div>
        {recipes.map((recipe) => {
          const isInBasket = includes(basketRecipesIds, recipe.id);
          return (
            <div className="rlw-item" key={recipe.id}>
              <div>
                <Link to={`${ROUTES.RECIPES}/${recipe.id}`}>{recipe.name}</Link>
                {isInBasket ? (
                  <button type="button" onClick={() => boundActions.removeFromBasket(recipe.id)}>
                    -
                  </button>
                ) : (
                  <button type="button" onClick={() => boundActions.addToBasket(recipe.id)}>
                    +
                  </button>
                )}
              </div>
              <ul className="rlw-ingredients-wrapper">
                {recipe.ingredients.map((ingredient) => {
                  const { amount, ingredientId, unitId } = ingredient;
                  const name = get(ingredientsMap, `${ingredientId}.name`);
                  const unitName = get(unitsMap, `${unitId}.name`);
                  return (
                    <li key={ingredientId} className="rlwiw-item">
                      <span className="rlwiwi-name">{name}</span>
                      <span className="ml mr">-</span>
                      <span className="rlwiwi-amount mr">{amount}</span>
                      <span className="rlwiwi-unit text-muted">{unitName}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div>
        <Link type="button" to={ROUTES.RECIPES_NEW}>
          Add
        </Link>
      </div>
    </div>
  );
}

RecipesList.propTypes = propTypes;

const reduxActions = { addToBasket, removeFromBasket };

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  ingredientsMap: getIngredientsMap(state),
  unitsMap: getUnitsMap(state),
  basketRecipesIds: getBasketRecipesIds(state),
});

const mapDispatchToProps = dispatch => ({
  boundActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipesList);
