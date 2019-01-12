import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getShoppingList } from 'modules/shopping/selectors';

const propTypes = {
  shoppingList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,

  boundActions: PropTypes.shape({}).isRequired,
};

function ShoppingList(props) {
  const { shoppingList } = props;
  const isEmpty = shoppingList.length === 0;

  return (
    <div>
      {isEmpty ? <div>Shopping list is empty</div> : null}
      <ol>
        {shoppingList.map(item => (
          <li key={item.id}>
            <strong>{item.ingredientName}</strong>
            <span>:</span>
            <span className="mlr">
              <i>{item.amount}</i>
            </span>
            <span>(</span>
            <span>{item.unitName}</span>
            <span>)</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

ShoppingList.propTypes = propTypes;

const reduxActions = {};

const mapStateToProps = state => ({
  shoppingList: getShoppingList(state),
});

const mapDispatchToProps = dispatch => ({
  boundActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingList);
