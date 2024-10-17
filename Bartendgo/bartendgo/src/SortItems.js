import React from 'react';

const SortableTableHeader = ({ label, sortKey, onSort, sortOrder }) => {
  const handleClick = () => {
    onSort(sortKey); // Call the onSort function passed from the parent
  };

  return (
    <th onClick={handleClick} className={`sortable-header ${sortOrder}`}>
      {label} {sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : ''}
    </th>
  );
};

export default SortableTableHeader;
