import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { unitsIdsMap, ingredientsIdsMap } from 'modules/recipes/selectors';
import { ROUTES } from 'common/constants/routes';

import './index.scss';

function RecipesList(props) {
  const { recipes } = props;
  const isEmptyList = recipes.length === 0;
  return (
    <div className="recipes-list-wrapper">
      <div>{isEmptyList && <div>There are no recipes yet</div>}</div>

      <div>
        {recipes.map(recipe => (
          <div className="rlw-item" key={recipe.id}>
            <div>
              <Link to={`${ROUTES.RECIPES}/${recipe.id}`}>{recipe.name}</Link>
            </div>
            <ul className="rlw-ingredients-wrapper">
              {recipe.ingredients.map((ingredient) => {
                const { amount, ingredientId, unitId } = ingredient;
                const name = ingredientsIdsMap[ingredientId].name;
                const unitName = unitsIdsMap[unitId].name;
                return (
                  <li key={ingredientId} className="rlwiw-item">
                    <span className="rlwiwi-name">{name}</span>
                    <span className="mlr">-</span>
                    <span className="rlwiwi-amount mr">{amount}</span>
                    <span className="rlwiwi-unit text-muted">{unitName}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <Link type="button" to={ROUTES.RECIPES_NEW}>
          Add
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
});

// const mapDispatchToProps = dispatch => bindActionCreators(
//   {
//   },
//   dispatch,
// );

export default connect(mapStateToProps)(RecipesList);
