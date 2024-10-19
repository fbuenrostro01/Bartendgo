

import React from 'react';
// this sorts the stuff from top to bottom
const SortableTableHeader = ({ label, sortKey, onSort, sortOrder }) => {
  return (
    <th onClick={() => onSort(sortKey)}>
      {label} {sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : ''}
    </th>
  );
};

export default SortableTableHeader;
