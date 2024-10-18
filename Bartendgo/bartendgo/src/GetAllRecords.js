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
  const [searchTerm, setSearchTerm] = useState(''); // temporarily stores the search term

  // gets all the records first
  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch(`${BASE_URL}/get/all?teamId=3`);
      const data = await response.json();
      setRecords(data.response); 
    };
    fetchAllRecords(); 
  }, []); // Empty array runs once

  // Sorts the items
  const handleSort = (key) => {
    let order = 'asc'; // sorts from top to bottom or bottom to top
    if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc'; 
    }
    setSortConfig({ key, order }); 
  };

  const sortedRecords = [...records].sort((a, b) => {
    if (!sortConfig.key) return 0; // if no key, nothing happens

    const aValue = a.data_json[sortConfig.key];
    const bValue = b.data_json[sortConfig.key]; 

    if (aValue < bValue) return sortConfig.order === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.order === 'asc' ? 1 : -1;
    return 0;
  });

  // Opens modal for editing
  const openModal = (record) => {
    setSelectedRecord(record); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); // closes window
  };

  // deletes record still havent coded it yet
  const handleDelete = () => {
    console.log("Item deleted", selectedRecord); // tests the deleted data in a console log 
    setIsModalOpen(false); 
  };

  // goes thourgh the records and only checks for name or brand of liqour
  const filteredRecords = sortedRecords.filter(record => {
    const { data_json } = record;
    return (
      data_json.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data_json.type_of_liquor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="background"> {/* Apply background styling updates the whole table including search bar */ } 
      <h1 style={{ display: 'inline-block', marginRight: '10px' }}>Bartendgo Inventory Management</h1> {/* Page Title */}
      <input  // cant set a classname specific for the searchbar withoug messing up the whole page if i have time ill try to look into i tmore tonight
        className="search-input" // Class for styling the search input
        type="text" 
        placeholder="Search inventory..." 
        value={searchTerm} // Link the input value to the state
        onChange={(e) => setSearchTerm(e.target.value)} // Update the state when the user types
      />

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
            {/*none of this stuff need to be sorted*/}
            <th>Stock Warning</th> 
            <th>Reorder Level</th> 
            <th>Action/Delete</th> 
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
                  {/* When "Click to edit" is clicked, open the modal */}
                  <span className="edit-link" onClick={() => openModal(record)}>Click to edit</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal for editing item, logic not made yet placeholder */}
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
