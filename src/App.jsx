import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Components/Countries";
import CountriesInfo from "./Components/CountriesInfo";
import Finder from "./Components/Finder";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        setError(null);
      })
      .catch((error) => {
        setError("Error: Failed to load country data.");
        console.error("Error:", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchCountry(event.target.value);
    setSelectedCountry(null);
    setIsSearching(true);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const errorMessage = () => {
    if (!isSearching) return null;
    if (error) return <p>{error}</p>;
    if (filteredCountries.length > 10)
      return <p>Too many matches, please refine your search.</p>;
    if (filteredCountries.length === 0)
      return <p>No countries match your search.</p>;
    return null;
  };

  return (
    <div>
      <h1>Country Information</h1>

      <Finder
        searchCountry={searchCountry}
        onSearch={handleSearch}
        errorMessage={errorMessage}
      />

      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <Countries
          countries={filteredCountries}
          onSelect={setSelectedCountry}
        />
      )}

      {filteredCountries.length === 1 && (
        <CountriesInfo country={filteredCountries[0]} />
      )}

      {selectedCountry && <CountriesInfo country={selectedCountry} />}
    </div>
  );
};

export default App;
