import React from 'react';
import cn from 'classnames';
import get from 'lodash/get';
import includes from 'lodash/includes';

import { MyCreatableSelect } from 'common/components/MySelect';

class IngredientItem extends React.Component {
  onSelectIngredient = (newValue) => {
    const { itemData } = this.props;
    this.props.onIngredientSelected(itemData.ingredientId, newValue);
  };

  onSelectNewIngredientUnit = (newValue) => {
    const { itemData } = this.props;
    this.props.onChangeUnit(itemData.ingredientId, newValue);
  };

  onAmountChange = (event) => {
    const { value } = event.target;
    const { itemData } = this.props;
    this.props.onAmountChange(itemData.ingredientId, value);
  };

  onRemoveItem = () => {
    const { itemData } = this.props;
    this.props.onRemoveItem(itemData.ingredientId);
  };

  getUnitData = () => {
    const { unitsMap, itemData } = this.props;
    const { ingredientData, unit } = itemData;

    // if (!ingredientData || !ingredientData.unitId) {
    //   return null;
    // }

    // return unitsMap[ingredientData.unitId];
    return unit;
  };

  /**
   * Returns available units options that are in ingredient.
   *
   * @return {Object[]}
   */
  getAvailableUnitOptions = () => {
    const { unitsOptions, itemData } = this.props;
    const isIngredientNew = get(itemData, 'ingredientData.__isNew__');

    if (isIngredientNew) {
      return unitsOptions;
    }
    
    const unitsIds = get(itemData, 'ingredientData.unitsIds', []);

    return unitsOptions.filter(unitOption => includes(unitsIds, unitOption.id));
  };

  render() {
    const {
      itemData, availableIngredientsList, unitsOptions, isLast,
    } = this.props;
    const { amount, ingredientData, unitData } = itemData;
    const ingredientId = get(ingredientData, 'id');
    const isIngredientSelected = Boolean(ingredientId);
    const unit = this.getUnitData();
    const isNew = get(ingredientData, '__isNew__', false);
    const availableUnitOptions = this.getAvailableUnitOptions();

    return (
      <div className="ingredient-item">
        <div className="ii-control ii-control-name">
          <MyCreatableSelect
            autoFocus={isLast}
            placeholder="Select ingredient"
            value={ingredientData}
            options={availableIngredientsList}
            onChange={this.onSelectIngredient}
          />
        </div>
        {isIngredientSelected || isNew ? (
          <React.Fragment>
            <div
              className={cn('ii-control ii-control-munit', {
                'ii-control-new': isNew,
              })}
            >
              <label>Amount</label>
              <input
                autoFocus={isLast}
                type="number"
                step="0.1"
                min="0"
                value={amount}
                onChange={this.onAmountChange}
              />
              <span>
                <div className="iicn-unit-select">
                  <MyCreatableSelect
                    placeholder="Select unit"
                    value={unit}
                    options={availableUnitOptions}
                    onChange={this.onSelectNewIngredientUnit}
                  />
                </div>
              </span>
            </div>
          </React.Fragment>
        ) : null}
        <div className="ii-control">
          <button type="button" onClick={this.onRemoveItem}>
            x
          </button>
        </div>
      </div>
    );
  }
}

export default IngredientItem;
