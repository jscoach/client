import React from "react";
import { InstantSearch } from "react-instantsearch/dom";

import Search from "./Search";
import logo from './logo.svg';
import "./App.css";

const App = () => (
  <InstantSearch
    appId={process.env.REACT_APP_ALGOLIA_APP_ID}
    apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
    indexName={process.env.REACT_APP_ALGOLIA_INDEX}
  >
    <img src={logo} className="App-logo" alt="logo" />
    <Search />
  </InstantSearch>
);

export default App;
