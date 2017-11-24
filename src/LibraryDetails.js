import React from "react";
import { withRouter } from "react-router-dom";
import { InstantSearch, Configure } from "react-instantsearch/dom";

import Readme from "./Readme";

const LibraryDetails = withRouter(({ match }) => {
  const { user, name } = match.params;
  const id = user ? `${user}/${name}` : name;

  return (
    <InstantSearch
      appId={process.env.REACT_APP_ALGOLIA_APP_ID}
      apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
      indexName={process.env.REACT_APP_INDEX_BY_RELEVANCE}
    >
      <Configure filters={`objectID:${id}`} />
      <Readme id={id} />
    </InstantSearch>
  );
});

export default LibraryDetails;
