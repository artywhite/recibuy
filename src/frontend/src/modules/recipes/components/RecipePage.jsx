import React from 'react';
import { connect } from 'react-redux';

import RecipeForm from 'modules/recipes/components/RecipeForm';

function RecipePage(props) {
  const {
    match: {
      params: { recipeId = '' },
    },
  } = props;
  return (
    <div>
      <h1>{recipeId ? 'Edit recipe' : 'Add new recipe'}</h1>
      <div>
        <RecipeForm recipeId={recipeId} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(RecipePage);
