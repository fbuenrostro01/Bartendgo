import React from 'react';

// when they enter stuff in search it filters to the stuff that matches it we dont need to click on search it does it per letter
const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      className="search-input" // styling for the input
      type="text" 
      placeholder="Search inventory..." // shows to show user
      value={searchTerm} // current value or thing we are searching
      onChange={(e) => setSearchTerm(e.target.value)} // this updates when they add more letters to it
    />
  );
};


export default SearchInput;
