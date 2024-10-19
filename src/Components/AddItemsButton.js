import React from 'react';
import './Styles/AddItemsButton.css'; 
// not coded yet will be working in this today
const AddItemsButton = ({ onClick }) => {
  return (
    <button className="add-item-button" onClick={onClick}>
      Add Item
    </button>
  );
};

export default AddItemsButton;
