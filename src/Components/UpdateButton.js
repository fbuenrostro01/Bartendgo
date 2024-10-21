import React, { useState } from 'react';

const UpdateButton = ({ record, brand, typeOfLiquor, price, amountOnHand, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!record) {
      console.error("No record records found testing dont delted in case it messes up");
      return;
    }

    setIsLoading(true);

    const updatedData = {
      team: 3,
      brand,
      price: price.toString(),
      item_id: record.data_json.item_id,
      reorder_level: record.data_json.reorder_level,
      stock_warning: record.data_json.stock_warning,
      amount_on_hand: amountOnHand,
      type_of_liquor: typeOfLiquor,
    };

    try {
      const response = await fetch(
        `https://unit-4-project-app-24d5eea30b23.herokuapp.com/update/data?teamId=3&recordId=${record.id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {  // some of these console logs arent required but left them for force of habit
        console.log("Record updated successfully");
        onClose();
      } else {
        console.error("Failed to update record");
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleClick} className="update-button" disabled={isLoading}>
      {isLoading ? 'Updating...' : 'Update'}
    </button>
  );
};

export default UpdateButton;
