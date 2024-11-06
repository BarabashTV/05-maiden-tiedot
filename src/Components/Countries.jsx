import React from "react";

const Countries = ({ countries, onSelect }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}
          &nbsp;
          <button onClick={() => onSelect(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
