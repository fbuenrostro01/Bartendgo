
//could have probably left it in the get all records but the code kept getting too long 
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

