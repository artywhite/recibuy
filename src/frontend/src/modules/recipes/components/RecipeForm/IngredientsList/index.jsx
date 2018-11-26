import React from 'react';
import get from 'lodash/get';
import compact from 'lodash/compact';
import includes from 'lodash/includes';

import { unitsIdsMap, ingredientsOptions, unitsOptions } from 'modules/recipes/selectors';
import IngredientItem from './Item';

import './index.scss';

class IngredientsList extends React.Component {
  getAvailableIngredients = () => {
    const { recipeIngredients } = this.props;
    const usedIds = compact(
      recipeIngredients.map(item => get(item, 'ingredientData.ingredientId')),
    );
    return ingredientsOptions.filter(item => !includes(usedIds, item.ingredientId));
  };

  updateListItem = (itemId, itemData) => {
    const nextIngredientsList = this.props.recipeIngredients.map((item) => {
      if (itemId !== item.ingredientId) {
        return item;
      }

      return { ...item, ...itemData };
    });

    this.props.onChange(nextIngredientsList);
  };

  onIngredientSelected = (itemId, updatedItemData) => {
    this.updateListItem(itemId, { ingredientData: updatedItemData });
  };

  onAmountChange = (itemId, value) => {
    this.updateListItem(itemId, { amount: value });
  };

  onChangeUnit = (itemId, newUnitData) => {
    this.updateListItem(itemId, { unit: newUnitData });
  };

  onRemoveItem = (itemId) => {
    const nextIngredientsList = this.props.recipeIngredients.filter(
      item => itemId !== item.ingredientId,
    );

    this.props.onChange(nextIngredientsList);
  };

  render() {
    const { recipeIngredients } = this.props;
    const options = this.getAvailableIngredients();

    return (
      <div className="ingredients-list-wrapper">
        <div className="ingredients-list">
          {recipeIngredients.map((item, index) => (
            <IngredientItem
              key={item.ingredientId}
              itemData={item}
              availableIngredientsList={options}
              onIngredientSelected={this.onIngredientSelected}
              onRemoveItem={this.onRemoveItem}
              onChangeUnit={this.onChangeUnit}
              onAmountChange={this.onAmountChange}
              unitsIdsMap={unitsIdsMap}
              unitsOptions={unitsOptions}
              isLast={index === recipeIngredients.length - 1}
            />
          ))}
        </div>
        <div>
          <button type="button" onClick={this.props.addIngredient}>
            Add ingredient
          </button>
        </div>
      </div>
    );
  }
}

export default IngredientsList;
