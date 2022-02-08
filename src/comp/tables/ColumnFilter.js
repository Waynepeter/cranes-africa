
import React from 'react';

function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;

  return (
    <span className="table-search">
      {/* Search: {' '} */}
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  );
}

export { ColumnFilter };