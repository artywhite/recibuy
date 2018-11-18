import React from 'react';
import { connect } from 'react-redux';

function RecipesPage(props) {
  const { myteststring } = props;
  return (
    <div>
      Recipes Page
      <div>
        myteststring:
        {myteststring}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  myteststring: state.recipesModule.recipes.myteststring,
});

export default connect(mapStateToProps)(RecipesPage);
