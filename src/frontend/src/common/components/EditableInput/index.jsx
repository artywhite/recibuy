/**
 * @exports EditableInput
 */
import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';

import useOnClickOutside from 'common/hooks/useOnClickOutside';

import './index.scss';

export function EditableInput(props) {
  const ref = useRef();
  const [currentInputValue, setInputValue] = useState(props.value);
  const [isInitClicked, setIsInitClicked] = useState(false);

  useOnClickOutside(ref, () => {
    setIsInitClicked(false);
    setInputValue(props.value);
  });

  /**
   * Finish editing handler.
   */
  const onFinishEditing = () => {
    const { onChange, value: initValue } = props;

    // Value was not changed.
    if (currentInputValue === initValue) {
      setIsInitClicked(false);
      return;
    }

    setIsInitClicked(false);

    onChange(currentInputValue);
  };

  /**
   * Submit event handler.
   *
   * @param {UIEvent} event
   */
  const onSubmit = (event) => {
    event.preventDefault();
    onFinishEditing();
  };

  /**
   * Change event handler.
   *
   * @param {UIEvent} event
   */
  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  /**
   * Renders controls in init (read) mode.
   */
  const renderInit = () => (
    <div className="ei-init-mode">
      <input
        onClick={() => setIsInitClicked(true)}
        className="form-control"
        value={currentInputValue}
        readOnly
        title={currentInputValue}
      />
    </div>
  );

  /**
   * Renders control in editing mode.
   */
  const renderEditingMode = () => (
    <form className="ei-editing-mode" onSubmit={onSubmit}>
      <input autoFocus className="form-control" value={currentInputValue} onChange={onChange} />
    </form>
  );

  return (
    <div className="editable-input-wrapper" ref={ref}>
      {isInitClicked ? renderEditingMode() : renderInit()}
    </div>
  );
}

EditableInput.propTypes = {
  /**
   * Init value for input.
   *
   * @type {String}
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Change event handler from parent component.
   *
   * @type {Function}
   */
  onChange: PropTypes.func.isRequired,
};

EditableInput.defaultProps = {
  value: '',
};

const EditableInputWrapper = props => <EditableInput {...props} key={props.value} />;

export default EditableInputWrapper;
