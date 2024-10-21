import React, { useEffect, useState } from 'react';
import './Styles/AddItemsButton.css'; 
// not coded yet will be working in this today
const AddItemsButton = ({ isOpen, onClose, submit, cancel, onClick}) => {
  const [showform, setShowForm] = useState(false)
  let [formData, setFormData] = useState({brand: '', price: '', item_id: '', reorder_level: '', stock_warning: '', amount_on_hand: '', type_of_liquor: ''})

  fetch('https://unit-4-project-app-24d5eea30b23.herokuapp.com/post/data?teamId=3', {
  method: 'POST',
  body:formData
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))

  let addRecord = (event) => {
    setShowForm(false)
  }
  
  let inputChange = (event) => {
    let {name, value} = event.target;
    setFormData({...formData, [name]:value})
    console.log(formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('form submitted', formData)
    setShowForm(false)
  }

  return (
    <div>
      <button onClick={() => setShowForm(true)} className="add-item-button" >
      Add Item
      {showform && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <form onSubmit={addRecord}>
              <h1 className='liquor-form-header'>Add Liquor Form</h1>
              <label>Brand:</label>
                <input className='add-input' onChange={inputChange} type='text' name='brand' value={formData.brand}></input>
              <br></br>
              <label>Price:</label>
                <input className='add-input' onChange={inputChange} type='text' name='price' value={formData.price}></input>
              <br></br>
              <label>Item Id:</label>
                <input className='add-input' onChange={inputChange} type='text' name='item_id' value={formData.item_id}></input>
              <br></br>
              <label>Reorder Level:</label>
                <input className='add-input' onChange={inputChange} type='text' name='reorder_level' value={formData.reorder_level}></input>
              <br></br>
              <label>Stock Warning:</label>
                <input className='add-input' onChange={inputChange} type='text' name='reorder_level' value={formData.stock_warning}></input>
              <br></br>
              <label>Amount:</label>
                <input className='add-input' onChange={inputChange} type='text' name='amount_on_hand' value={formData.amount_on_hand}></input>
              <br></br>
              <label>Liquor:</label>
                <input className='add-input' onChange={inputChange} type='text' name='liquor' value={formData.type_of_liquor}></input>
              <br></br>
              <button type='submit'>Add Item</button>
            </form>
          </div>
        </div>

      )}
      </button>
  </div>    
  );
};

export default AddItemsButton;

