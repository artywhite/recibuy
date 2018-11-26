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

    const { recipeId, recipesIdsMap } = props;
    const existRecipe = recipesIdsMap[recipeId];

    const ingredients = existRecipe ? getConvertedFromApiRecipeData(existRecipe).ingredients : [];
    const name = get(existRecipe, 'name', '');
    const id = get(existRecipe, 'id');

    this.state = {
      id,
      name,
      recipeIngredients: ingredients,
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
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor={nameId}>Name</label>
          <input value={name} onChange={this.onNameChange} id={nameId} type="text" />
        </div>

        <div className="form-group">
          <label htmlFor="">Ingredients list</label>
          <IngredientList
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
});

const mapDispatchToProps = dispatch => ({
  boundActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeForm);
