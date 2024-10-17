import logo from './logo.svg';
import './App.css';

import GetAllRecords from './GetAllRecords'; // Ensure this path is correct


/* 
// spencers original code for the login page i was unable to somehow combine it with mine to have the login page show up first 
once we get on same page we should be able to combine both 
didnt touch or edit anything in the components folder once we all get togher we can talk and plan how to keep everthing in folders

function App() {
  return (
  <div>
    <Login/>
  </div>
  );
}

 */




function App() {
  return (
    <div className="App">
      {/* Render the GetAllRecords component to display all records */}
      <GetAllRecords />
     
    </div>
  );
}

export default App;
