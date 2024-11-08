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

  const [temp, setTemp] = useState(null);
  const [weatherEmoji, setWeatherEmoji] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

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

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
      const capital = filteredCountries[0].capital[0];

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          setTemp(response.data.main.temp.toFixed(1));
          setWeatherEmoji(
            `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
          );
          setWeatherDescription(
            response.data.weather[0].description.charAt(0).toUpperCase() +
              response.data.weather[0].description.slice(1)
          );
          setWindSpeed(response.data.wind.speed);
        })
        .catch((error) => {
          console.log("Error fetching weather data:", error);
        });
    }
  }, [filteredCountries, apiKey]);

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

      {filteredCountries.length === 1 && (
        <CountriesInfo
          country={filteredCountries[0]}
          temp={temp}
          weatherEmoji={weatherEmoji}
          weatherDescription={weatherDescription}
          windSpeed={windSpeed}
        />
      )}

      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <Countries
          countries={filteredCountries}
          onSelect={setSelectedCountry}
        />
      )}
    </div>
  );
};

export default App;
