import React, { useEffect, useState } from 'react';
import './Components/Styles/index.css';
import SearchInput from './Components/SearchInput'; 
import InventoryTable from './Components/InventoryTable'; 
import EditModal from './Components/EditItemWindow'; 
import AddItemsButton from './Components/AddItemsButton';
import LogOutButton from './Components/LogOutButton';

const BASE_URL = "https://unit-4-project-app-24d5eea30b23.herokuapp.com"; 

const GetAllRecords = ({ onLogout }) => { 
  const [records, setRecords] = useState([]); 
  const [sortConfig, setSortConfig] = useState({ key: null, order: null }); 
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch(`${BASE_URL}/get/all?teamId=3`); 
      const data = await response.json(); 
      setRecords(data.response); 
    };
    fetchAllRecords(); 
  }, []);

  const handleSort = (key) => {
    let order = 'asc'; 
    if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc'; 
    }
    setSortConfig({ key, order }); 
  };

  const sortedRecords = [...records].sort((a, b) => {
    if (!sortConfig.key) return 0; 
    const aValue = a.data_json[sortConfig.key]; 
    const bValue = b.data_json[sortConfig.key]; 
   
    if (aValue < bValue) return sortConfig.order === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.order === 'asc' ? 1 : -1;
    return 0; 
  });

  const openModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const handleDelete = () => {
    console.log("Item deleted", selectedRecord); 
    setIsModalOpen(false); 
  };

  const filteredRecords = sortedRecords.filter(record => {
    const { data_json } = record;
    // Check if the necessary fields exist before using `toLowerCase()`
    const brand = data_json.brand ? data_json.brand.toLowerCase() : '';
    const typeOfLiquor = data_json.type_of_liquor ? data_json.type_of_liquor.toLowerCase() : '';
    
    return (
      brand.includes(searchTerm.toLowerCase()) || 
      typeOfLiquor.includes(searchTerm.toLowerCase())
    );
  });

  const handleAddItem = () => {
    console.log("Add item button clicked"); 
  };

  return (
    <div className="background">
      <h1 style={{ display: 'inline-block', marginRight: '10px' }}>Bartendgo Inventory Management</h1>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddItemsButton onClick={handleAddItem} />
      <InventoryTable  
        records={filteredRecords} 
        handleSort={handleSort} 
        sortConfig={sortConfig} 
        openModal={openModal} 
      />
      <EditModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        record={selectedRecord} 
        onDelete={handleDelete} 
      />
      <div className="logout-container">
        <LogOutButton onClick={onLogout} />
      </div>
    </div>
  );
};

export default GetAllRecords;
