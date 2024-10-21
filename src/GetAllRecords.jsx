import React, { useEffect, useState } from 'react';
import './Components/Styles/index.css';
import SearchInput from './Components/SearchInput'; 
import InventoryTable from './Components/InventoryTable'; 
import EditModal from './Components/EditItemWindow'; 
import AddItemsButton from './Components/AddItemsButton';
import LogOutButton from './Components/LogOutButton';
import UpdateButton from './Components/UpdateButton';

const BASE_URL = "https://unit-4-project-app-24d5eea30b23.herokuapp.com"; 

const GetAllRecords = ({ onLogout }) => { 
  const [records, setRecords] = useState([]); 
  const [sortConfig, setSortConfig] = useState({ key: null, order: null }); 
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const fetchAllRecords = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get/all?teamId=3`); 
      if (!response.ok) throw new Error('Failed to fetch records');
      const data = await response.json(); 
      setRecords(data.response); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
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

  const closeModal = async () => {
    setIsModalOpen(false); 
    await fetchAllRecords(); // Refresh records when closing the window
  };

  const handleDelete = async () => {
    if (selectedRecord) {
      try {
        const response = await fetch(`${BASE_URL}/delete/data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: selectedRecord.id,
            team: 3
          }),
        });

        if (response.ok) {
          console.log("Item deleted", selectedRecord);
        } else {
          console.error("test log");
        }
      } catch (error) {
        console.error(error);
      } finally {
        closeModal(); // Close the modal window thing after deleting
      }
    }
  };

  const handleUpdate = async (updatedRecord) => {
    try {
      const response = await fetch(`${BASE_URL}/update/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedRecord,
          team: 3,
        }),
      });

      if (response.ok) {
        console.log("Item updated", updatedRecord);
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error(error);
    } finally {
      closeModal(); // Closes the window
    }
  };

  const filteredRecords = sortedRecords.filter(record => {
    const { data_json } = record;
    const brand = data_json.brand ? data_json.brand.toLowerCase() : '';
    const typeOfLiquor = data_json.type_of_liquor ? data_json.type_of_liquor.toLowerCase() : '';
    
    return (
      brand.includes(searchTerm.toLowerCase()) || 
      typeOfLiquor.includes(searchTerm.toLowerCase())
    );
  });
//leftover code for when we were testing stuff
  const handleAddItem = () => {
    console.log("Add item button clicked"); 
  };

  return (
    <div className="background">
      <h1 style={{ display: 'inline-block', marginRight: '10px' }}>Bartendgo Inventory Management</h1>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddItemsButton 
        refreshData={fetchAllRecords} // Pass the refresh function
        isOpen={isModalOpen}
        onClose={closeModal}
      />
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
        onUpdate={() => (
          <UpdateButton
            record={selectedRecord}
            brand={selectedRecord.data_json.brand} // Pass necessary data
            price={selectedRecord.data_json.price}
            amountOnHand={selectedRecord.data_json.amount_on_hand}
            typeOfLiquor={selectedRecord.data_json.type_of_liquor}
            onClose={closeModal}
            refreshData={fetchAllRecords} // Pass the fetchAllRecords function
          />
        )} 
      />
      <div className="logout-container">
        <LogOutButton onClick={onLogout} />
      </div>
    </div>
  );
};

export default GetAllRecords;


