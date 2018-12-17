import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uniqueId from 'lodash/uniqueId';
import get from 'lodash/get';

import {
  getConvertedToApiRecipeData,
  getRecipesIdsMap,
  getConvertedFromApiRecipeData,
} from 'modules/recipes/selectors';

import { getIngredients, getIngredientsMap } from 'modules/ingredients/selectors';
import { getUnits, getUnitsMap } from 'modules/units/selectors';

import { addRecipe, updateRecipe } from 'modules/recipes/actions';

import IngredientList from './IngredientsList';

class RecipeForm extends React.Component {
  static propTypes = {
    boundActions: PropTypes.shape({
      addRecipe: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    const { recipeId, recipesIdsMap, ingredients, unitsMap } = props;
    const existRecipe = recipesIdsMap[recipeId];

    const recipeIngredients = existRecipe ? getConvertedFromApiRecipeData(existRecipe, ingredients, unitsMap).ingredients : [];
    const name = get(existRecipe, 'name', '');
    const id = get(existRecipe, 'id');

    this.state = {
      id,
      name,
      recipeIngredients,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { id, name, recipeIngredients } = this.state;
    const newRecipeData = { id, name, recipeIngredients };
    const convertedData = getConvertedToApiRecipeData(newRecipeData);
    console.warn('state', this.state);
    console.warn('converteData', convertedData);

    if (id) {
      this.props.boundActions.updateRecipe(convertedData);
    } else {
      this.props.boundActions.addRecipe(convertedData);
    }
  };

  onIngredientsRecipesChange = (newValue) => {
    this.setState({ recipeIngredients: newValue });
  };

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  addIngredient = () => {
    const { recipeIngredients } = this.state;
    this.setState({
      recipeIngredients: [
        ...recipeIngredients,
        { amount: '', ingredientData: null, ingredientId: uniqueId('tempIngredientId') },
      ],
    });
  };

  render() {
    const nameId = uniqueId('name');
    const { name, recipeIngredients } = this.state;
    const { ingredients, units, ingredientsMap, unitsMap } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor={nameId}>Name</label>
          <input value={name} onChange={this.onNameChange} id={nameId} type="text" />
        </div>

        <div className="form-group">
          <label htmlFor="">Ingredients list</label>
          <IngredientList
            ingredients={ingredients}
            units={units}
            ingredientsMap={ingredientsMap}
            unitsMap={unitsMap}
            addIngredient={this.addIngredient}
            recipeIngredients={recipeIngredients}
            onChange={this.onIngredientsRecipesChange}
          />
        </div>

        <div className="form-group">
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}

const reduxActions = { addRecipe, updateRecipe };

const mapStateToProps = state => ({
  recipesIdsMap: getRecipesIdsMap(state),
  ingredients: getIngredients(state),
  units: getUnits(state),
  ingredientsMap: getIngredientsMap(state),
  unitsMap: getUnitsMap(state),
});

const mapDispatchToProps = dispatch => ({
  boundActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeForm);
