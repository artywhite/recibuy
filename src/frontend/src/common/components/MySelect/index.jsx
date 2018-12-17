import React from 'react';

import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

function MySelect(props) {
  return <Select {...props} />;
}

export function MyCreatableSelect(props) {
  return (
    <CreatableSelect
      getOptionLabel={option => option.name || option.label}
      getOptionValue={option => option.id || option.value}
      {...props}
      /**
       * TODO: workaround for crashing
       *
       * https://github.com/JedWatson/react-select/issues/2944#issuecomment-414843929
       */
      isValidNewOption={(inputValue, selectValue, selectOptions) => {
        const isNotDuplicated = !selectOptions.map(option => option.label).includes(inputValue);
        const isNotEmpty = inputValue !== '';
        return isNotEmpty && isNotDuplicated;
      }}
    />
  );
}

export default MySelect;
