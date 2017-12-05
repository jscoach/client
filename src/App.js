import React, { Component } from "react";
import { InstantSearch, Configure } from "react-instantsearch/dom";
import { Route, Redirect, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import pickBy from "lodash.pickby";
import identity from "lodash.identity";
import throttle from "lodash.throttle";
import PropTypes from "prop-types";
import qs from "qs";

import Search from "./Search";
import LibraryDetails from "./LibraryDetails";

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
  "stars",
  "communityPick",
  "homepage",
  "customRepoPath",
];

const sortOptions = [
  { value: process.env.REACT_APP_INDEX_BY_RELEVANCE, label: "relevance" },
  { value: process.env.REACT_APP_INDEX_BY_UPDATED_AT, label: "updated" },
];

const collectionsOrder = ["React", "React Native", "React VR", "Webpack", "Babel", "PostCSS"];

const filterDelimiter = ".";

const classicRoutes = {
  all: null,
  react: "React",
  "react-native": "React+Native",
  webpack: "Webpack",
  browserify: "Browserify",
  babel: "Babel",
  postcss: "PostCSS",
};

const stripFalsy = object => pickBy(object, identity);

const createURL = state => {
  const selectedSortOption = sortOptions.find(option => state.sortBy === option.value);

  const params = stripFalsy({
    search: state.query,
    sort: selectedSortOption && selectedSortOption.label,
    collection: state.menu && state.menu.collections,
    category: state.menu && state.menu.categories,
    styling:
      state.refinementList &&
      state.refinementList.styling &&
      state.refinementList.styling.join(filterDelimiter),
    compatibility:
      state.refinementList &&
      state.refinementList.compatibility &&
      state.refinementList.compatibility.join(filterDelimiter),
  });

  return qs.stringify(params, { format: "RFC1738", addQueryPrefix: true });
};

const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : "";

const urlToSearchState = location => {
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const selectedSortOption = sortOptions.find(option => params.sort === option.label);

  return stripFalsy({
    query: params.search,
    sortBy: selectedSortOption && selectedSortOption.value,
    menu: stripFalsy({
      collections: params.collection,
      categories: params.category,
    }),
    refinementList: stripFalsy({
      styling: params.styling && params.styling.split(filterDelimiter),
      compatibility: params.compatibility && params.compatibility.split(filterDelimiter),
    }),
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: window.location.search === "" && window.location.pathname === "/",
      searchState: urlToSearchState(props.location),
    };
    this.updateURL = throttle(this.updateURL, 1000);
  }

  onSearchStateChange = searchState => {
    this.updateURL(searchState);
    this.setState({ isHome: false, searchState });
  };

  updateURL = searchState => {
    this.props.history.push(searchStateToUrl(this.props, searchState), searchState);
  };

  componentWillReceiveProps(props) {
    if (
      props.location.pathname !== this.props.location.pathname ||
      props.location.search !== this.props.location.search
    ) {
      this.setState({
        isHome: false,
        searchState: urlToSearchState(props.location),
      });
    }
  }

  render() {
    const isHome = this.state.isHome;

    const currentCollection =
      this.state.searchState &&
      this.state.searchState.menu &&
      this.state.searchState.menu.collections;

    const currentQuery = this.state.searchState && this.state.searchState.query;

    return (
      <div
        className={`min-h-screen font-sans tracking-tight ${
          isHome ? "bg-grey-lighter" : "bg-white"
        }`}>
        <InstantSearch
          appId={process.env.REACT_APP_ALGOLIA_APP_ID}
          apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
          indexName={process.env.REACT_APP_INDEX_BY_UPDATED_AT}
          searchState={this.state.searchState}
          onSearchStateChange={this.onSearchStateChange}
          createURL={createURL}>
          <Configure attributesToRetrieve={attributesToRetrieve} />
          <Search
            sortOptions={sortOptions}
            collectionsOrder={collectionsOrder}
            currentCollection={currentCollection}
            currentQuery={currentQuery}
            isHome={isHome}
          />
        </InstantSearch>

        <Switch>
          {Object.keys(classicRoutes).map(slug => [
            <Route
              exact
              key={`${slug}-root`}
              path={`/${slug}`}
              component={() => <Redirect to={`/?collection=${classicRoutes[slug]}`} />}
            />,
            <Route
              exact
              key={slug}
              path={`/${slug}/:name`}
              component={({ match }) => <Redirect to={`/${match.params.name}`} />}
            />,
          ])}
          <Route path="/:user?/:name" component={LibraryDetails} />
        </Switch>

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
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export default App;
