import React from 'react'
import { findResultsState } from 'react-instantsearch-dom/server';
import algoliasearch from "algoliasearch/lite";
import { withRouter } from 'next/router';
import identity from "lodash.identity";
import get from "lodash.get";
import isEqual from "lodash.isequal";
import pickBy from "lodash.pickby";
import qs from "qs";

import Algolia from '../components/Algolia';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY,);
const updateAfter = 700;
const sortOptions = [
  {value: process.env.REACT_APP_INDEX_BY_RELEVANCE, label: "relevance"},
  {value: process.env.REACT_APP_INDEX_BY_UPDATED_AT, label: "updated"},
];
const filterDelimiter = ".";
const DEFAULT_PROPS = {
  searchClient,
  indexName: process.env.REACT_APP_INDEX_BY_UPDATED_AT,
};

const stripFalsy = object => pickBy(object, identity);
const createURL = state => {
  const selectedSortOption = sortOptions.find(option => state.sortBy === option.value);
  const params = stripFalsy({
    search: state.query,
    sort: selectedSortOption && selectedSortOption.label,
    collection: get(state, 'menu.collections'),
    category: get(state, 'menu.categories'),
    styling: get(state, 'refinementList.styling', []).join(filterDelimiter),
    compatibility: get(state, 'refinementList.compatibility', []).join(filterDelimiter)
  });

  return qs.stringify(params, {format: "RFC1738", addQueryPrefix: true});
};
const pathToSearchState = path => path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {};
const searchStateToURL = searchState => searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';

class Home extends React.PureComponent {

  state = {
    searchState: this.props.searchState,
    lastRouter: this.props.router,
  };

  static async getInitialProps({asPath}) {
    const searchState = pathToSearchState(asPath);
    const resultsState = await findResultsState(Algolia, {
      ...DEFAULT_PROPS,
      searchState,
    });

    return {
      resultsState,
      searchState,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(state.lastRouter, props.router)) {
      return {
        searchState: pathToSearchState(props.router.asPath),
        lastRouter: props.router,
      };
    }

    return null;
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);

    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToURL(searchState);

      this.props.router.push(href, href, {
        shallow: true,
      });
    }, updateAfter);

    this.setState({searchState});
  };

  render() {

    return <div className="min-h-screen font-sans tracking-tight w-full">
      <Algolia
        {...DEFAULT_PROPS}
        onSearchStateChange={this.onSearchStateChange}
        createURL={createURL}
        searchState={this.state.searchState}
        resultsState={this.props.resultsState}
      />
    </div>
  }
}

export default withRouter(Home);
