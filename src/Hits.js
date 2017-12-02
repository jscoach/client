import React from "react";
import { connectInfiniteHits, connectStateResults } from "react-instantsearch/connectors";

import humanizedNumber from "./humanizedNumber";
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

const Delimiter = connectStateResults(
  ({ index, searchResults }) =>
    (index + 1) % searchResults.hitsPerPage === 0 ? (
      <div className="relative border-b text-grey my-2" data-count={humanizedNumber(index + 1)} />
    ) : null
);

const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => (
  <div>
    <NoResults />

    {hits.map((hit, index) => [
      <Hit hit={hit} key={hit.objectID} />,
      <Delimiter key={`delimiter-${hit.objectID}`} index={index} />,
    ])}

    {hasMore && (
      <button
        className="text-blue text-lg font-semibold border p-3 mt-3 w-full bg-white hover:bg-grey-lighter rounded shadow"
        onClick={refine}
        disabled={!hasMore}>
        Load More
      </button>
    )}
  </div>
));

export default Hits;
