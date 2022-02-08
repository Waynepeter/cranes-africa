
import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

function GlobalFilter({ filter, setFilter }) {
  const [ value, setValue ] = useState(filter);
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined);
  }, 0); // Fire the search after 350ms from when typing begun.

  return (
    <span className="table-search">
      <input
        value={value || ''}
        placeholder="Search in table..."
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
    </span>
  );
}

export { GlobalFilter };