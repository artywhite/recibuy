import React from 'react';
import { connect } from 'react-redux';

import RecipeForm from 'modules/recipes/components/RecipeForm';

function RecipePage(props) {
  console.warn('recipePage render', props);
  const {
    match: {
      params: { recipeId = '' },
    },
  } = props;
  return (
    <div>
      <h3>(todo: it's also edit page) Add new recipe</h3>
      <div>
        <RecipeForm recipeId={recipeId} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(RecipePage);
