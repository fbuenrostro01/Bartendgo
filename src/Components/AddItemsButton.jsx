import React, { useState } from 'react';
import './Styles/AddItemsButton.css'; 

const AddItemsButton = ({ refreshData }) => {
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
    console.log(formData); // leaving some console logs here in case we have last minute issues
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log('Form submitted', formData); // Log the data being submitted for debugging

    // the stuff gets prepared here first 
    const dataToSend = {
      team: 3, 
      body: {
        brand: formData.brand,
        price: formData.price,
        item_id: formData.item_id,
        reorder_level: formData.reorder_level,
        stock_warning: formData.stock_warning,
        amount_on_hand: formData.amount_on_hand,
        type_of_liquor: formData.type_of_liquor
      }
    };

    // we sendn the data here 
    try {
      const response = await fetch('https://unit-4-project-app-24d5eea30b23.herokuapp.com/post/data?teamId=3', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', // this tells it we are sending json data
        },
        body: JSON.stringify(dataToSend), 
      });

      if (response.ok) {  // althoug not neccesart we checked here first if we even get the data
        const data = await response.json(); 
        console.log('Item added successfully:', data); 
        refreshData(); 
        setShowForm(false); // closes it after we submitee it
      } else {
        console.error('Failed to add item:', response.statusText); // im leaving the console logs for any issues we might have later they were very handy
      }
    } catch (error) {
      console.error('Error:', error); 
    }
  };

  return (  //renders the window where we take inputs for the new item we wanna add
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
              <button type='button' onClick={() => setShowForm(false)}>Cancel</button> {/*closes the window if they click cancel with the show form thing to false*/}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItemsButton;

