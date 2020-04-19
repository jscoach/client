import React from 'react'
import { Configure, InstantSearch, ScrollTo } from "react-instantsearch-dom";
import get from "lodash.get";

import Search from "../Search";
import Topbar from "../Topbar";

const attributesToRetrieve = [
  "categories",
  "collections",
  "dependents",
  "description",
  "downloads",
  "styling",
  "latestRelease",
  "license",
  "modifiedAt",
  "name",
  "compatibility",
  "publishedAt",
  "repositoryName",
  "repositoryUser",
  "repositoryUserAvatar",
  "stars",
  "communityPick",
  "homepage",
  "customRepoPath",
  "pushedAt",
  "donationUrl",
];
const sortOptions = [
  {value: process.env.REACT_APP_INDEX_BY_RELEVANCE, label: "relevance"},
  {value: process.env.REACT_APP_INDEX_BY_UPDATED_AT, label: "updated"},
];
const collectionsOrder = ["React", "React Native", "React VR", "Webpack", "Babel", "PostCSS"];

function Algolia(props) {
  const currentCollection = get(props, 'searchState.menu.collections');
  const currentQuery = get(props, 'searchState.search');

  return <InstantSearch
    searchClient={props.searchClient}
    resultsState={props.resultsState}
    indexName={props.indexName}
    searchState={props.searchState}
    onSearchStateChange={props.onSearchStateChange}
    createURL={props.createURL}
    {...props}
  >
    <Configure attributesToRetrieve={attributesToRetrieve}/>
    <ScrollTo>
      <Topbar/>
      <Search
        sortOptions={sortOptions}
        collectionsOrder={collectionsOrder}
        currentCollection={currentCollection}
        currentQuery={currentQuery}
      />
    </ScrollTo>
  </InstantSearch>
}

export default Algolia;
