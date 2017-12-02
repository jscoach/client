import React from "react";
import { connectPoweredBy } from "react-instantsearch/connectors";

// You can find alternative Algolia logos in their website: https://algolia.com/press#resources
import logo from "./images/algolia-logo.svg";

const SearchPoweredBy = connectPoweredBy(({ url }) => (
  <div className="flex items-center mt-8 mx-3">
    <span className="text-black text-xs">Search by</span>
    <a href={url} target="_blank">
      <img src={logo} alt="Algolia" className="block pl-1 h-4" draggable="false" />
    </a>
  </div>
));

export default SearchPoweredBy;
