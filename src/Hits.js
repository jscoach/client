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
      <div className="bg-white text-black border border-t-0 p-3 text-grey-dark rounded-b">
        No results have been found for {searchState.query}
      </div>
    )
);

const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => (
  <div className="w-full">
    <NoResults />

    {hits.map(hit => <Hit hit={hit} key={hit.objectID} />)}

    {hasMore && (
      <button
        className="text-blue text-lg font-semibold border border-t-0 rounded-b p-3 w-full bg-white hover:bg-grey-lightest"
        onClick={refine}
        disabled={!hasMore}
      >
        Load More
      </button>
    )}
  </div>
));

export default Hits;
