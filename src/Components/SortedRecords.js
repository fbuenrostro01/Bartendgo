import React from 'react';
import SortableTableHeader from './SortItems'; 

const SortedRecords = ({ records, handleSort, sortConfig, openModal }) => {
  return (
    <table id="inventory-table">
      <thead>
        <tr>
          <SortableTableHeader label="Item ID" sortKey="id" onSort={handleSort} sortOrder={sortConfig.key === 'id' ? sortConfig.order : ''} />
          <SortableTableHeader label="Type of Liquor" sortKey="type_of_liquor" onSort={handleSort} sortOrder={sortConfig.key === 'type_of_liquor' ? sortConfig.order : ''} />
          <SortableTableHeader label="Brand" sortKey="brand" onSort={handleSort} sortOrder={sortConfig.key === 'brand' ? sortConfig.order : ''} />
          <SortableTableHeader label="Price" sortKey="price" onSort={handleSort} sortOrder={sortConfig.key === 'price' ? sortConfig.order : ''} />
          <SortableTableHeader label="Amount on Hand" sortKey="amount_on_hand" onSort={handleSort} sortOrder={sortConfig.key === 'amount_on_hand' ? sortConfig.order : ''} />
          <th>Stock Warning</th>
          <th>Reorder Level</th>
          <th>Action/Delete</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => {
          const { id, data_json } = record;
          const { brand, type_of_liquor, price, amount_on_hand, reorder_level } = data_json;
          const lowStockThreshold = 5;
          const stockWarning = amount_on_hand < lowStockThreshold ? "Low Stock" : "In Stock";

          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{type_of_liquor}</td>
              <td>{brand}</td>
              <td>{price}</td>
              <td>{amount_on_hand}</td>
              <td className={amount_on_hand < lowStockThreshold ? "low-stock" : ""}>{stockWarning}</td>
              <td>{reorder_level}</td>
              <td>
                <span className="edit-link" onClick={() => openModal(record)}>Click to edit</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SortedRecords;
