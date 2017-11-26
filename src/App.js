import React, { Component } from "react";
import { InstantSearch, Configure } from "react-instantsearch/dom";
import { Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import pickBy from "lodash.pickby";
import identity from "lodash.identity";
import throttle from "lodash.throttle";
import PropTypes from "prop-types";
import qs from "qs";

import Search from "./Search";
import LibraryDetails from "./LibraryDetails";

import "./tailwind.css";

const attributesToRetrieve = [
  "categories",
  "collections",
  "dependents",
  "description",
  "downloads",
  "features",
  "latestRelease",
  "license",
  "modifiedAt",
  "name",
  "platforms",
  "publishedAt",
  "repositoryName",
  "repositoryUser",
  "stars"
];

const sortOptions = [
  { value: process.env.REACT_APP_INDEX_BY_RELEVANCE, label: "relevance" },
  { value: process.env.REACT_APP_INDEX_BY_UPDATED_AT, label: "updated" }
];

const filterDelimiter = ";";

const stripFalsy = object => pickBy(object, identity);

const createURL = state => {
  const selectedSortOption = sortOptions.find(
    option => state.sortBy === option.value
  );

  const params = stripFalsy({
    query: state.query,
    sort: selectedSortOption && selectedSortOption.label,
    collection: state.menu && state.menu.collections,
    category: state.menu && state.menu.categories,
    features:
      state.refinementList &&
      state.refinementList.features &&
      state.refinementList.features.join(filterDelimiter),
    platforms:
      state.refinementList &&
      state.refinementList.platforms &&
      state.refinementList.platforms.join(filterDelimiter)
  });

  return qs.stringify(params, { format: "RFC1738", addQueryPrefix: true });
};

const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : "";

const urlToSearchState = location => {
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const selectedSortOption = sortOptions.find(
    option => params.sort === option.label
  );

  return stripFalsy({
    query: params.query,
    sortBy: selectedSortOption && selectedSortOption.value,
    menu: stripFalsy({
      collections: params.collection,
      categories: params.category
    }),
    refinementList: stripFalsy({
      features: params.features && params.features.split(filterDelimiter),
      platforms: params.platforms && params.platforms.split(filterDelimiter)
    })
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchState: urlToSearchState(props.location) };
    this.updateURL = throttle(this.updateURL, 1000);
  }

  onSearchStateChange = searchState => {
    this.updateURL(searchState);
    this.setState({ searchState });
  };

  updateURL = searchState => {
    this.props.history.push(
      searchStateToUrl(this.props, searchState),
      searchState
    );
  };

  componentWillReceiveProps(props) {
    if (
      props.location.pathname !== this.props.location.pathname ||
      props.location.search !== this.props.location.search
    ) {
      this.setState({ searchState: urlToSearchState(props.location) });
    }
  }

  render() {
    const isHome =
      window.location.search === "" &&
      this.state.searchState.page === undefined;

    const currentCollection =
      this.state.searchState &&
      this.state.searchState.menu &&
      this.state.searchState.menu.collections;

    return (
      <div
        className={`min-h-screen font-sans tracking-tight ${
          isHome ? "bg-grey-lighter" : "bg-white"
        }`}
      >
        <InstantSearch
          appId={process.env.REACT_APP_ALGOLIA_APP_ID}
          apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
          indexName={process.env.REACT_APP_INDEX_BY_RELEVANCE}
          searchState={this.state.searchState}
          onSearchStateChange={this.onSearchStateChange}
          createURL={createURL}
        >
          <Configure attributesToRetrieve={attributesToRetrieve} />
          <Search
            sortOptions={sortOptions}
            currentCollection={currentCollection}
            isHome={isHome}
          />
        </InstantSearch>

        <Route path="/:user?/:name" component={LibraryDetails} />

        <Helmet
          defaultTitle={process.env.REACT_APP_SITE_NAME}
          titleTemplate={`%s / ${process.env.REACT_APP_SITE_NAME}`}
        />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  location: PropTypes.object.isRequired
};

export default App;
