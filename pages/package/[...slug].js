import React from "react";
import algoliasearch from "algoliasearch/lite";
import { withRouter } from "next/router";
import { findResultsState } from "react-instantsearch-dom/server";
import get from "lodash.get";
import NotFound from "../404";
import { NextSeo } from "next-seo";

import Algolia from '../../components/Algolia/package';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY,);

const DEFAULT_PROPS = {
  searchClient,
  indexName: process.env.REACT_APP_INDEX_BY_RELEVANCE,
};


const LibraryDetails = ({package_name, package_user, router, resultsState, searchState}) => {
  let id = router.query.objectID;
  if (!id) {
    id = package_user ? `${package_user}/${package_name}` : package_name;
  }
  const hit = resultsState && resultsState.rawResults[0].hits.find(hit => hit.name === id);

  React.useEffect(() => {
    console.log('router.query', router.query)
  }, [])

  return !hit ? <NotFound/> : <>
    <NextSeo
      title={`${hit.name} - JS.coach`}
      description={hit.description}
      keywords={hit.keywords.join(',')}
      openGraph={{
        title: `${hit.name} - JS.coach`,
        description: hit.description
      }}
    />
    {resultsState ? <Algolia
      {...DEFAULT_PROPS}
      searchState={searchState}
      resultsState={resultsState}
    /> : null}
  </>;
};

LibraryDetails.getInitialProps = async (props) => {
  const slug = get(props, 'query.slug');
  if (slug.length > 2) return {};
  const searchState = {query: slug.join('/'), page: '1'};
  const resultsState = await findResultsState(Algolia, {
    ...DEFAULT_PROPS,
    searchState: searchState,
  });

  if (slug.length > 1) {
    return {
      package_name: slug[1],
      package_user: slug[0],
      resultsState,
      searchState
    }
  } else {
    return {
      package_name: slug[0],
      resultsState,
      searchState
    }
  }
};

export default withRouter(LibraryDetails);
