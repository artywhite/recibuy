import React from 'react';
import includes from 'lodash/includes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addToBasket, removeFromBasket } from 'modules/basket/actions';
import { getBasketRecipes, getBasketRecipesIds } from 'modules/basket/selectors';

const propTypes = {
  basketRecipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,

  boundActions: PropTypes.shape({
    addToBasket: PropTypes.func.isRequired,
    removeFromBasket: PropTypes.func.isRequired,
  }).isRequired,

  basketRecipesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function BasketList(props) {
  const { boundActions, basketRecipes, basketRecipesIds } = props;
  const isEmpty = basketRecipes.length === 0;

  return (
    <div>
      {isEmpty ? <div>Basket is empty</div> : null}
      <ol>
        {basketRecipes.map((item) => {
          const isInBasket = includes(basketRecipesIds, item.id);
          return (
            <li key={item.id}>
              <span>{item.name}</span>
              {isInBasket ? (
                <button type="button" onClick={() => boundActions.removeFromBasket(item.id)}>
                  -
                </button>
              ) : (
                <button type="button" onClick={() => boundActions.addToBasket(item.id)}>
                  +
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

BasketList.propTypes = propTypes;

const reduxActions = { addToBasket, removeFromBasket };

const mapStateToProps = state => ({
  basketRecipes: getBasketRecipes(state),
  basketRecipesIds: getBasketRecipesIds(state),
});

const mapDispatchToProps = dispatch => ({
  boundActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BasketList);
