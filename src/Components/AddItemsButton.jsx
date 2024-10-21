import React, { useState } from 'react';
import './Styles/AddItemsButton.css'; 

const AddItemsButton = ({ onClick }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    price: '',
    item_id: '',
    reorder_level: '',
    stock_warning: '',
    amount_on_hand: '',
    type_of_liquor: ''
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData); // For debugging purposes only
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted', formData); // Confirm form submission

    // Commenting out the fetch to prevent any unwanted network requests
    /*
    fetch('https://unit-4-project-app-24d5eea30b23.herokuapp.com/post/data?teamId=3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    */

    setShowForm(false); // Close the form after submission
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)} className="add-item-button">
        Add Item
      </button>
      {showForm && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <form onSubmit={handleSubmit}>
              <h1 className='liquor-form-header'>Add Liquor Form</h1>
              <label>Brand:</label>
              <input className='add-input' onChange={inputChange} type='text' name='brand' value={formData.brand} />
              <br />
              <label>Price:</label>
              <input className='add-input' onChange={inputChange} type='text' name='price' value={formData.price} />
              <br />
              <label>Item Id:</label>
              <input className='add-input' onChange={inputChange} type='text' name='item_id' value={formData.item_id} />
              <br />
              <label>Reorder Level:</label>
              <input className='add-input' onChange={inputChange} type='text' name='reorder_level' value={formData.reorder_level} />
              <br />
              <label>Stock Warning:</label>
              <input className='add-input' onChange={inputChange} type='text' name='stock_warning' value={formData.stock_warning} />
              <br />
              <label>Amount:</label>
              <input className='add-input' onChange={inputChange} type='text' name='amount_on_hand' value={formData.amount_on_hand} />
              <br />
              <label>Liquor:</label>
              <input className='add-input' onChange={inputChange} type='text' name='type_of_liquor' value={formData.type_of_liquor} />
              <br />
              <button type='submit'>Add Item</button>
              <button type='button' onClick={() => setShowForm(false)}>Cancel</button> {/* Cancel button */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItemsButton;


