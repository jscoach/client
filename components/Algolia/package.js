import React from 'react'
import { Configure, InstantSearch, ScrollTo } from "react-instantsearch-dom";

import Readme from "../Readme";
import Topbar from "../Topbar";

function Algolia(props) {

  return <InstantSearch
    searchClient={props.searchClient}
    resultsState={props.resultsState}
    indexName={props.indexName}
    searchState={props.searchState}
    {...props}
  >
    <Configure filters={`objectID:${props.searchState.query}`}/>
    <ScrollTo>
      <Topbar/>
      <Readme/>
    </ScrollTo>
  </InstantSearch>
}

export default Algolia;
