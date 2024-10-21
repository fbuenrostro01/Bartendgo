import React, { useEffect, useState } from 'react';
import './Styles/EditWindow.css'; 
import UpdateButton from './UpdateButton'; // Import the UpdateButton

const EditModal = ({ isOpen, onClose, record, onDelete }) => {
  const [brand, setBrand] = useState('');
  const [typeOfLiquor, setTypeOfLiquor] = useState('');
  const [price, setPrice] = useState(0);
  const [amountOnHand, setAmountOnHand] = useState(0);

  useEffect(() => {
    if (record) {
      setBrand(record.data_json.brand);
      setTypeOfLiquor(record.data_json.type_of_liquor);
      setPrice(record.data_json.price); // Ensure this is a plain number
      setAmountOnHand(record.data_json.amount_on_hand); // Ensure this is a plain number
    }
  }, [record]);

  if (!isOpen) return null;

  const handleUpdate = async () => {
    // Construct the updated data to match the required format
    const updatedData = {
      make: brand, // Brand corresponds to "make"
      model: typeOfLiquor, // Type of liquor corresponds to "model"
      color: price.toString(), // Price as a string for color
    };

    // Call the API to update the record on the server
    const BASE_URL = "https://unit-4-project-app-24d5eea30b23.herokuapp.com";
    const response = await fetch(`${BASE_URL}/update/data?teamId=3&recordId=${record.id}`, {
      method: 'PUT', // Use PUT for updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData), // Send the updated data
    });

    if (response.ok) {
      console.log("Record updated successfully");
      onClose(); // Close the modal after updating
    } else {
      console.error("Failed to update record");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Item</h2>
        <label>
          Brand
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>

        <label>
          Type of Liquor
          <input
            value={typeOfLiquor}
            onChange={(e) => setTypeOfLiquor(e.target.value)}
          />
        </label>

        <label className='price'>
          Price
          <input
            className='price-box'
            type="number"
            value={price} // Ensure this is a plain number
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) { // Regex to allow only digits and one dot
                setPrice(value);
              }
            }}
          />
        </label>

        <label className='amount'>
          Amount
          <input
            className='amount-box'
            type="number"
            value={amountOnHand} // Ensure this is a plain number
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) { // Regex to allow only digits
                setAmountOnHand(value);
              }
            }}
          />
        </label>

        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={onDelete}>Delete Item</button>
          <UpdateButton record={record} onClick={handleUpdate} /> {/* Pass record prop */}
        </div>
      </div>
    </div>
  );
};

export default EditModal;

