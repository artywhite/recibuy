import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { onDidMount } from 'common/hooks';

import RecipesList from 'modules/recipes/components/RecipesList';
import { fetchRecipes } from 'modules/recipes/actions';

const propTypes = {
  fetchRecipes: PropTypes.func.isRequired,
};

function RecipesPage(props) {
  onDidMount(props.fetchRecipes);
  return (
    <div>
      <RecipesList />
    </div>
  );
}

RecipesPage.propTypes = propTypes;

const reduxActions = { fetchRecipes };
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators(reduxActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipesPage);
