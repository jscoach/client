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

const Hits = connectHits(({hits}) => {
  return <>
    <NoResults/>
    {hits.map((hit, i) => {
      return <>
        {i === Math.ceil(hits.length / 2) ? <Inline key={i}/> : null}
        <Hit hit={hit} key={hit.objectID}/>
      </>
    })
    }
    <a
      href="https://instantsave.app/"
      target="_blank"
      className={
        `relative bg-white text-black p-3 hover:bg-gray-100 rounded w-full block`
      }>
      <div className="mb-2">
        <div className="text-gray-600 text-sm mb-1">
          <span className="text-orange-900 pr-2">Ad</span>
        </div>
        <div className="text-gray-700">
          <a
            className={'text-blue-600 hover:text-blue-700 focus:text-blue-800 visited no-underline'}>
            <strong className={'pr-2 text-lg'}>
              InstantSave Instagram downloader
            </strong>
          </a>
        </div>
      </div>
      <p className="mb-2 leading-tight">
        InstantSave can help you download Post, Story, IGTV and Reel from Instagram. It&#x27;s also easy to copy
        interesting tags from Instagram. This software is completely free!
      </p>
    </a>
    <Pagination/>
  </>
});

export default Hits;
