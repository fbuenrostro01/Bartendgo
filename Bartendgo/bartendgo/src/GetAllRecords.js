import React, { useEffect, useState } from 'react';
import './index.css'; 
import SortableTableHeader from './SortItems'; // this lets us sort the header for items
import EditModal from './EditItemWindow'; // the stuff for editing items not completed yet


const BASE_URL = "https://unit-4-project-app-24d5eea30b23.herokuapp.com";


const GetAllRecords = () => {
  const [records, setRecords] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, order: null });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetches all the stuff first
  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch(`${BASE_URL}/get/all?teamId=3`);
      const data = await response.json();
      setRecords(data.response); 
    };
    fetchAllRecords(); 
  }, []); // Empty array runs once
  // sorts the items
  const handleSort = (key) => {
    let order = 'asc'; // sorts from top to bottom or bottometo top cant remember
    if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc'; 
    }
    setSortConfig({ key, order }); 
  };

  
  const sortedRecords = [...records].sort((a, b) => {
    if (!sortConfig.key) return 0; // if no key nothing happen

    const aValue = a.data_json[sortConfig.key];
    const bValue = b.data_json[sortConfig.key]; // more sorting crap trying to understand it 

    if (aValue < bValue) return sortConfig.order === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.order === 'asc' ? 1 : -1;
    return 0;
  });

  // Function to opens window thing when click logic is still not coded
  const openModal = (record) => {
    setSelectedRecord(record); 
    setIsModalOpen(true); 
  };

  
  const closeModal = () => {
    setIsModalOpen(false); //closes window
  };

  // Function to handle deleting a record (just a placeholder for now)
  const handleDelete = () => {
    console.log("Item deleted", selectedRecord); // Log the deleted item
    setIsModalOpen(false); 
  };

  // for the life of em i coulnt figure out how to delete or update some of the json stuff that was already there this skipps all a few lines 
  // so it only shows the actual drinks it will need to be deleted 
  const filteredRecords = sortedRecords.filter(record => record.id < 3 || record.id > 34);

  return (
    <div className="background"> {/* Apply background styling */}
      <h1>Bartendgo Inventory Management</h1> {/* Page Title */}
      
      {/* Inventory table */}
      <table id="inventory-table">
        <thead>
          <tr>
            {/* Each header is clickable for sorting */}
            <SortableTableHeader
              label="Item ID"
              sortKey="id"
              onSort={handleSort}
              sortOrder={sortConfig.key === 'id' ? sortConfig.order : ''}
            />
            <SortableTableHeader
              label="Type of Liquor"
              sortKey="type_of_liquor"
              onSort={handleSort}
              sortOrder={sortConfig.key === 'type_of_liquor' ? sortConfig.order : ''}
            />
            <SortableTableHeader
              label="Brand"
              sortKey="brand"
              onSort={handleSort}
              sortOrder={sortConfig.key === 'brand' ? sortConfig.order : ''}
            />
            <SortableTableHeader
              label="Price"
              sortKey="price"
              onSort={handleSort}
              sortOrder={sortConfig.key === 'price' ? sortConfig.order : ''}
            />
            <SortableTableHeader
              label="Amount on Hand"
              sortKey="amount_on_hand"
              onSort={handleSort}
              sortOrder={sortConfig.key === 'amount_on_hand' ? sortConfig.order : ''}
            />
            <th>Stock Warning</th> {/* Static header, no sorting */}
            <th>Reorder Level</th> {/* Static header, no sorting */}
            <th>Action/Delete</th> {/* Static header, no sorting */}
          </tr>
        </thead>
        <tbody>
          {/* Loop through filtered records to display each row */}
          {filteredRecords.map((record) => {
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
                  {/* When "Click to edit" is clicked, open the window thing */}
                  <span className="edit-link" onClick={() => openModal(record)}>Click to edit</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* window for editing item again logic not made yet placeholder*/}
      <EditModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        record={selectedRecord} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default GetAllRecords;
