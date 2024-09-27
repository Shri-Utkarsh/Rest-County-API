import React, { useEffect, useState } from "react";
import './CountryDetail.css'
import { Link, useLocation, useParams } from "react-router-dom";
import { useWindowSize } from "./CustomeHoook";

export default function CountryDetail() {
  // const countryName = new URLSearchParams(location.search).get("name");
  const windowSize = useWindowSize()

  const params = useParams()
 
  const countryName = params.CountryDetail
 
  const [countryData, setCountrydata] = useState(null);
  const [notFound, setNotFound] = useState(false)

    
  function updateCountryData(data){
    setCountrydata({
      flagImage: data.flags.svg,
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {} )[0].common,
      population: data.population.toLocaleString("en-IN"),
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      topLevelDomain: data.tld.join(", "),
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      language: Object.values(data.languages || {}).join(', '),
      borders: []  
    })
    if(!data.borders){
      data.borders = []
    }        
    Promise.all(data.borders?.map((border) => {
      return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
      .then((res) => res.json())
      .then(([borderCountry]) => borderCountry.name.common)
    })).then((borders) =>{
      setCountrydata((prev) => ({...prev, borders}))
      })
  }

  useEffect(() => {

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
   
        updateCountryData(data)
      }).catch(err => {
        console.log(err);
        setNotFound(true)
      })
  }, [countryName]);

    if (notFound){
      return <div>Country not found</div>
    }
  return countryData === null ? ('Loading.....') : (
    <main>
      <h1 style={{ textAlign: "center" }}>
        {windowSize.width} X {windowSize.height}
      </h1>
      <div className="country-details-container">
        <span className="back-button" onClick={() => {history.back()}}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flagImage} alt="" />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: </b>
                <span className="native-name">{countryData.nativeName || countryData.name}</span>
              </p>
              <p>
                <b>Population: </b>
                <span className="population">{countryData.population}</span>
              </p>
              <p>
                <b>Region: </b>
                <span className="region">{countryData.region}</span>
              </p>
              <p>
                <b>Sub Region: </b>
                <span className="sub-region">{countryData.subregion}</span>
              </p>
              <p>
                <b>Capital: </b>
                <span className="capital">{countryData.capital?.join(', ')}</span>
              </p>
              <p>
                <b>Top Level Domain: </b>
                <span className="top-level-domain">
                  {countryData.topLevelDomain}
                </span>
              </p>
              <p>
                <b>Currencies: </b>
                <span className="currencies">{countryData.currencies}</span>
              </p>
              <p>
                <b>Languages: </b>
                <span className="languages">{countryData.language}</span>
              </p>
            </div>
            { countryData.borders.length !== 0 && <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
              {
                countryData.borders.map((border) => <Link key={border} to={`/${border}`}>{border}</Link>)
              }
            </div>}
          </div>
        </div>
      </div>
    </main>
  );
}
