const RecordRow = ({ record, openModal }) => { // we take the record thing with the stuff and the window thing here
  const { id, data_json } = record; // we get teh id and json form the record
  const { brand, type_of_liquor, price, amount_on_hand, reorder_level } = data_json;

  const lowStockThreshold = 5;
  const stockWarning = amount_on_hand < lowStockThreshold ? "Low Stock" : "In Stock";
// returns teh render for the stuf we just extracted 
// line 21 passed that specifi item to openmodel so we only edits that one 
  return (
      <tr key={id}> 
          <td>{id}</td> 
          <td>{type_of_liquor}</td> 
          <td>{brand}</td> 
          <td>{price}</td> 
          <td>{amount_on_hand}</td> 
          <td className={amount_on_hand < lowStockThreshold ? "low-stock" : ""}>
              {stockWarning} 
          </td>
          <td>{reorder_level}</td> 
          <td>
              <span className="edit-link" onClick={() => openModal(record)}>Click to edit</span>
          </td>
      </tr>
  );
};

export default RecordRow;
