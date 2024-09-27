import React, { useContext, useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import FilterbyRegion from "./FilterbyRegion";
import CountriesContainer from "./CountriesContainer";
import { useWindowSize } from "./CustomeHoook";

export default function Home() {
  const [query, setQuery] = useState("");
  const windowSize = useWindowSize()


  return (
    <main>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <FilterbyRegion setQuery={setQuery}/>
      </div>
      <h1 style={{ textAlign: "center" }}>
        {windowSize.width} X {windowSize.height}
      </h1>
      <CountriesContainer query={query} />
    </main>
  );
}
