import React, { useEffect, useState } from 'react';
import './Styles/EditWindow.css'; 
import UpdateButton from './UpdateButton';
// in the browser the console log kept giving an error about a specified balue coulnt be parse
// i didnt have time to look into it but doesnt seem to affect program 
const EditModal = ({ isOpen, onClose, record, onDelete }) => {
  const [formData, setFormData] = useState({
    brand: '',
    typeOfLiquor: '',
    price: 0,
    amountOnHand: 0
  });

  useEffect(() => {
    if (record) {
      setFormData({
        brand: record.data_json.brand,
        typeOfLiquor: record.data_json.type_of_liquor,
        price: record.data_json.price,
        amountOnHand: record.data_json.amount_on_hand
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'amountOnHand' ? Number(value) : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Item</h2>
        
        <label>
          Brand
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </label>

        <label>
          Type of Liquor
          <input
            name="typeOfLiquor"
            value={formData.typeOfLiquor}
            onChange={handleChange}
          />
        </label>

        <label className='price'>
          Price
          <input
            className='price-box'
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>

        <label className='amount'>
          Amount
          <input
            className='amount-box'
            type="number"
            name="amountOnHand"
            value={formData.amountOnHand}
            onChange={handleChange}
          />
        </label>

        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={onDelete}>Delete Item</button>
          <UpdateButton
            record={record}
            brand={formData.brand}
            typeOfLiquor={formData.typeOfLiquor}
            price={formData.price}
            amountOnHand={formData.amountOnHand}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default EditModal;



