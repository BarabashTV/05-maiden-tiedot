import React from "react";

const CountriesInfo = ({
  country,
  temp,
  weatherEmoji,
  weatherDescription,
  windSpeed,
}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        width="200"
      />
      <div>
        <h3>Weather in {country.capital[0]}</h3>
        <p>Temperature: {temp}°C</p>
        <img src={weatherEmoji} alt="weather icon" />
        <p>{weatherDescription}</p>
        <p>Wind speed: {windSpeed} m/s</p>
      </div>
    </div>
  );
};

export default CountriesInfo;
