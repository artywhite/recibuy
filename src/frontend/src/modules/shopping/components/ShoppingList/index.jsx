import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditableInput from 'common/components/EditableInput';

import { removeShoppingListItem, updateShoppingListItem } from 'modules/shopping/actions';

import './index.scss';

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
  const { boundActions, shoppingList } = props;
  const isEmpty = shoppingList.length === 0;

  return (
    <div className="shopping-list-wrapper">
      {isEmpty ? <div>Shopping list is empty</div> : null}
      <ol>
        {shoppingList.map(item => (
          <li key={item.id}>
            <strong>{item.ingredientName}</strong>
            <span>:</span>
            <span className="ml mr">
              <EditableInput
                value={item.amount}
                onChange={newAmount => boundActions.updateShoppingListItem(item.id, Number(newAmount))
                }
              />
            </span>
            <span>(</span>
            <span>{item.unitName}</span>
            <span>)</span>
            <span className="ml">
              <button type="button" onClick={() => boundActions.removeShoppingListItem(item.id)}>
                x
              </button>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

ShoppingList.propTypes = propTypes;

const reduxActions = {
  removeShoppingListItem,
  updateShoppingListItem,
};

const mapStateToProps = state => ({
  shoppingList: state.shopping.shoppingList,
});

const mapDispatchToProps = dispatch => ({
  boundActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingList);
