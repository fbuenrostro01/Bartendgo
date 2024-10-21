import React from 'react';
import './Styles/EditWindow.css'; 
// wee need to update a few things from here 
const EditModal = ({ isOpen, onClose, record, onDelete, onUpdate }) => {
  if (!isOpen) return null; // doesnt render if not open

  const { brand, type_of_liquor, price, amount_on_hand } = record.data_json;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Item</h2>
        <p>Brand: {brand}</p>
        <p>Type of Liquor: {type_of_liquor}</p>

        <label className='price'>
          Price
          <input className='price-box' type="number" defaultValue={price} />
        </label>
        
        <label className='amount'>
          Amount
          <input className='amount-box' type="number" defaultValue={amount_on_hand} />
        </label>

        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={onDelete}>Delete Item</button>
          <button onClick={onUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
