// this is for single rows only 
const RecordRow = ({ record, openModal }) => {
    // Destructure the id and data_json from the record
    const { id, data_json } = record;
    // Destructure individual fields from data_json
    const { brand, type_of_liquor, price, amount_on_hand, reorder_level } = data_json;
    
    // a const for if the amount is low we can edit it to whatever
    const lowStockThreshold = 5;
    
    const stockWarning = amount_on_hand < lowStockThreshold ? "Low Stock" : "In Stock";

    return (
      <tr key={id}> {/* Use id as a unique key for this row */}
        <td>{id}</td> {/* Display the Item ID */}
        <td>{type_of_liquor}</td> {/* Display the type of liquor */}
        <td>{brand}</td> {/* Display the brand name */}
        <td>{price}</td> {/* Display the price */}
        <td>{amount_on_hand}</td> {/* Display the amount on hand */}
        <td className={amount_on_hand < lowStockThreshold ? "low-stock" : ""}>
          {stockWarning} {/* Show stock warning message */}
        </td>
        <td>{reorder_level}</td> {/* Display the reorder level */}
        <td>
          {/* Link to edit the item, opens a modal when clicked */}
          <span className="edit-link" onClick={() => openModal(record)}>Click to edit</span>
        </td>
      </tr>
    );
};


export default RecordRow;
