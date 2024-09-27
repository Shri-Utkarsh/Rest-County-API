import React from 'react'
import { Link } from 'react-router-dom'

export default function CountryCard({name, population, region, capital, flags, data}) {
    
    return (
    
        <Link className="country-card" to={`/${name}`}>
          <div className="flag-container">
          <img src={flags} alt={name + ' Flag'}/>
          </div>
          <div className="card-text">
              <h3 className="card-title">{name}</h3>
              <p><b>Population: </b>{population}</p>
              <p><b>Region: </b>{region}</p>
              <p><b>Capital: </b>{capital}</p>
          </div>
        </Link>
   
  )
}
