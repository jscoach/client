import React from "react";
import {
  connectInfiniteHits,
  connectStateResults
} from "react-instantsearch/connectors";

import Hit from "./Hit";

const NoResults = connectStateResults(
  ({ searchState, searchResults }) =>
    searchResults &&
    searchResults.nbHits === 0 && (
      <div className="bg-white text-black p-3 text-grey-dark text-xl w-full">
        No results have been found for {searchState.query}.
      </div>
    )
);

const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => (
  <div>
    <NoResults />

    {hits.map(hit => <Hit hit={hit} key={hit.objectID} />)}

    {hasMore && (
      <button
        className="text-blue text-lg font-semibold border p-3 mt-3 w-full bg-white hover:bg-grey-lighter rounded shadow"
        onClick={refine}
        disabled={!hasMore}
      >
        Load More
      </button>
    )}
  </div>
));

export default Hits;
