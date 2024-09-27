import React, { useEffect, useState } from "react";
// import AllCountriesData from "../AllCountriesData";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountriesContainer({ query }) {
  const [AllCountriesData, setAllCountriesData] = useState([])
  // console.log(AllCountriesData);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      setAllCountriesData(data)
    });
  }, [])

    if(!AllCountriesData.length){
      return <CountriesListShimmer/>
    }
  return (
    <>
    
      <div className="countries-container">
        {AllCountriesData.filter((country) =>
          country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
        ).map((country) => {
          return (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
              flags={country.flags.svg}
              data={country}
            />
          );
        })}
      </div>
    </>
  );
}
