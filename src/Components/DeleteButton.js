
import React from 'react';

const DeleteButton = ({ id, onDelete }) => {
    const handleDelete = () => {
        const requestData = {
            id: id, 
            team: 3  /// team id do not touch it borks the whole code would have liked to have kept most of the code here
            // but kept having issues with figuring out how import work the rest is in get all records
        };

        fetch('https://unit-4-project-app-24d5eea30b23.herokuapp.com/delete/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            onDelete(); 
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <button onClick={handleDelete}>Delete Item</button>
    );
};

export default DeleteButton;
