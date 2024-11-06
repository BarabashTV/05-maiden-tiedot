import React from "react";

const Finder = ({ searchCountry, onSearch, errorMessage }) => {
  return (
    <div>
      <label>Find countries:</label>
      &nbsp;
      <input
        type="text"
        placeholder="Find countries..."
        value={searchCountry}
        onChange={onSearch}
      />
      {errorMessage()}
    </div>
  );
};

export default Finder;
