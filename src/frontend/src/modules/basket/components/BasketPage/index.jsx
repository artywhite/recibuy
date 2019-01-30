import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ROUTES } from 'common/constants/routes';

import { getBasketRecipes } from 'modules/basket/selectors';
import BasketList from 'modules/basket/components/BasketList';

const propTypes = {
  basketRecipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
};

function BasketPage(props) {
  const { basketRecipes } = props;
  const isEmpty = basketRecipes.length === 0;
  return (
    <div>
      <div>
        <BasketList />
      </div>

      {!isEmpty ? <Link to={ROUTES.SHOPPING_LIST}>Shopping list</Link> : null}
      <div />
    </div>
  );
}

BasketPage.propTypes = propTypes;

const mapStateToProps = state => ({
  basketRecipes: getBasketRecipes(state),
});

export default connect(mapStateToProps)(BasketPage);
