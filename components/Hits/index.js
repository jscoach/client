import React from "react";
import { connectHits, connectStateResults } from "react-instantsearch-dom";
import Pagination from "./Pagination"
import Hit from "./Hit";
import Inline from "../Advertisement/Inline";

const NoResults = connectStateResults(
  ({searchState, searchResults}) =>
    searchResults &&
    searchResults.nbHits === 0 && (
      <div className="bg-white text-black p-3 text-gray-900 text-xl w-full">
        No results have been found for {searchState.query}.
      </div>
    )
);

const Hits = connectHits(({hits}) => (
  <>
    <NoResults/>
    {hits.map((hit, i) => {
      return <>
        {i === Math.ceil(hits.length / 2) ? <Inline key={i}/> : null}
        <Hit hit={hit} key={hit.objectID}/>
      </>
    })}
    <Pagination/>
  </>
));

export default Hits;
