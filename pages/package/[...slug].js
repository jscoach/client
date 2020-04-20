import React from "react";
import { InstantSearch, Configure } from "react-instantsearch/dom";
import algoliasearch from "algoliasearch/lite";
import Readme from "../../components/Readme";
import Topbar from "../../components/Topbar";
import { withRouter } from "next/router";
import { findResultsState } from "react-instantsearch-dom/server";
import get from "lodash.get";
import { ScrollTo } from "react-instantsearch-dom";
import { NextSeo } from "next-seo";

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY,);

const DEFAULT_PROPS = {
  searchClient,
  indexName: process.env.REACT_APP_INDEX_BY_RELEVANCE,
};

function Algolia(props) {
  return <>
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.REACT_APP_INDEX_BY_RELEVANCE}
    >
      <Configure filters={`objectID:${props.id}`}/>
      <ScrollTo>
        <Topbar/>
        <Readme id={props.id}/>
      </ScrollTo>
    </InstantSearch></>
}

const LibraryDetails = ({package_name, package_user, router, resultsState}) => {
  let id = router.query.objectID;
  if (!id) {
    id = package_user ? `${package_user}/${package_name}` : package_name;
  }
  const hit = resultsState && resultsState.rawResults[0].hits.find(hit => hit.name === id);

  return <>
    {hit ?
      <NextSeo
        title={`${hit.name} - JS.coach`}
        description={hit.description}
        keywords={hit.keywords.join(',')}
        openGraph={{
          title: `${hit.name} - JS.coach`,
          description: hit.description
        }}
      /> : null}
    <Algolia
      {...DEFAULT_PROPS}
      resultsState={resultsState}
      id={id}
    />
  </>;
};

LibraryDetails.getInitialProps = async (props) => {
  const slug = get(props, 'query.slug');
  const resultsState = await findResultsState(Algolia, {
    ...DEFAULT_PROPS,
    searchState: {query: slug.join('/'), page: 1}
  });

  if (slug.length > 1) {
    return {
      package_name: slug[1],
      package_user: slug[0],
      resultsState
    }
  } else {
    return {
      package_name: slug[0],
      resultsState
    }
  }
};

export default withRouter(LibraryDetails);
