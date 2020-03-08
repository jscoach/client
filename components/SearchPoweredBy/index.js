import React from "react";
import { connectPoweredBy } from "react-instantsearch-dom";

const Index = connectPoweredBy(({ url }) => (
  <div className="flex items-center mt-8 mx-3">
    <span className="text-black text-xs">Search by</span>
    <a href={url} target="_blank">
      <img src="images/algolia-logo.svg" alt="Algolia" className="block pl-1 h-4 inline" draggable="false" />
    </a>
  </div>
));

export default Index;
