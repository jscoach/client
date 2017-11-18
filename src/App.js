import React, { Component } from "react";
import { InstantSearch } from "react-instantsearch/dom";
import PropTypes from "prop-types";
import qs from "qs";

import Search from "./Search";
import logo from "./logo.svg";
import "./App.css";

const createURL = state => `?${qs.stringify(state)}`;
const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : "";
const urlToSearchState = location => qs.parse(location.search.slice(1));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchState: urlToSearchState(props.location) };
  }

  componentWillReceiveProps(props) {
    if (props.location !== this.props.location) {
      this.setState({ searchState: urlToSearchState(props.location) });
    }
  }

  onSearchStateChange = (searchState) => {
    clearTimeout(this.debouncedSetState);
    this.debouncedSetState = setTimeout(() => {
      this.props.history.push(
        searchStateToUrl(this.props, searchState),
        searchState
      );
    }, 700);
    this.setState({ searchState });
  }

  render() {
    return (
      <InstantSearch
        appId={process.env.REACT_APP_ALGOLIA_APP_ID}
        apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
        indexName={process.env.REACT_APP_INDEX_BY_RELEVANCE}
        searchState={this.state.searchState}
        onSearchStateChange={this.onSearchStateChange}
        createURL={createURL}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <Search />
      </InstantSearch>
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
