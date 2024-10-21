import React from 'react';

const UpdateButton = ({ record, onClick }) => {
  const handleClick = () => {
    if (!record) {
      console.error("No record provided for update");
      return;
    }
    onClick(); // Call the passed in onClick function if record is valid
  };

  return (
    <button onClick={handleClick} className="update-button">
      Update
    </button>
  );
};

export default UpdateButton;
