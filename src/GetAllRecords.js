import React, { useEffect, useState } from 'react';
import './Components/Styles/index.css'; // the styles and css are in the styles folder
import SearchInput from './Components/SearchInput'; // filets teh stuff when searching
import InventoryTable from './Components/InventoryTable'; //
import EditModal from './Components/EditItemWindow'; 
import AddItemsButton from './Components/AddItemsButton'; // this is imports tthing thing for the add items button specically 
// if we add any more buttons lets to to make and keep login into a single component so its easier to manage

const BASE_URL = "https://unit-4-project-app-24d5eea30b23.herokuapp.com"; 

const GetAllRecords = () => { // all our states are here

  const [records, setRecords] = useState([]); // we use it of sorting
 
  const [sortConfig, setSortConfig] = useState({ key: null, order: null }); 
  
  const [selectedRecord, setSelectedRecord] = useState(null);
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');

  // our main fetch to get all the stuff from api server thing
  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch(`${BASE_URL}/get/all?teamId=3`); 
      const data = await response.json(); 
      setRecords(data.response); 
    };
    fetchAllRecords(); 
  }, []);

  // this handles the soritng when you click on it and toggles from top to bottom (hehe)
  const handleSort = (key) => {
    let order = 'asc'; 
    if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc'; 
    }
    setSortConfig({ key, order }); // Update sorting configuration state
  };

  // Sorts it based on the current configuration
  const sortedRecords = [...records].sort((a, b) => {
    if (!sortConfig.key) return 0; // default sort thing is nothing is clicked
    const aValue = a.data_json[sortConfig.key]; 
    const bValue = b.data_json[sortConfig.key]; 
   
    if (aValue < bValue) return sortConfig.order === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.order === 'asc' ? 1 : -1;
    return 0; 
  });

  // opens the window for editing 
  const openModal = (record) => {
    setSelectedRecord(record); // we get the current record
    setIsModalOpen(true); // opens it
  };

  // some as top but for closing it
  const closeModal = () => {
    setIsModalOpen(false); 
  };

  // test for for deleting stuff we need to work on this
  const handleDelete = () => {
    console.log("Item deleted", selectedRecord); // Log the deleted item
    setIsModalOpen(false); // closes window
  };

  // filters records for the searc
  const filteredRecords = sortedRecords.filter(record => {
    const { data_json } = record; // not 100 percent sure had to get help
    return (
      data_json.brand.toLowerCase().includes(searchTerm.toLowerCase()) || // filters by th ebrand 
      data_json.type_of_liquor.toLowerCase().includes(searchTerm.toLowerCase()) // filters by type
    );
  });

  // this is for when adding extra item we still need to work on this with actual login in the add items component
  const handleAddItem = () => {
    // Logic for adding an item (e.g., open a modal)
    console.log("Add item button clicked"); // Placeholder for add item logic
  };

  // actually renders the stuff
  return (
    <div className="background">
      <h1 style={{ display: 'inline-block', marginRight: '10px' }}>Bartendgo Inventory Management</h1>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Renders the search input */}
      <AddItemsButton onClick={handleAddItem} /> {/* Renders the add items button */}
      <InventoryTable  // the lines below mostly just pass the stuff 
        records={filteredRecords} // Pass filtered records to InventoryTable
        handleSort={handleSort} // Pass sort handler
        sortConfig={sortConfig} 
        openModal={openModal} 
      />
      <EditModal 
        isOpen={isModalOpen} // Pass modal open state
        onClose={closeModal} // Pass close function
        record={selectedRecord} // Pass the selected record for editing
        onDelete={handleDelete} // Pass delete handler
      />
    </div>
  );
};

export default GetAllRecords; 
