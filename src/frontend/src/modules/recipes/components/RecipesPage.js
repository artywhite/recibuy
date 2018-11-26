import React from 'react';
import { connect } from 'react-redux';


import RecipesList from 'modules/recipes/components/RecipesList';

function RecipesPage(props) {
  return (
    <div>
      <RecipesList />
    </div>
  );
}

const mapStateToProps = state => ({});



export default connect(mapStateToProps)(RecipesPage);
