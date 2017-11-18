import React from "react";
import {
  Hits,
  Menu,
  Pagination,
  Panel,
  PoweredBy,
  RefinementList,
  SearchBox
} from "react-instantsearch/dom";

import Library from "./Library";

const Search = () => {
  return (
    <div className="container">
      <SearchBox />

      <Menu attributeName="collections" />

      <Panel title="Categories">
        <RefinementList attributeName="categories" />
      </Panel>

      <Panel title="Filters">
        <RefinementList attributeName="filters" />
      </Panel>

      <Hits hitComponent={Library} />
      <Pagination />

      <PoweredBy />
    </div>
  );
};

export default Search;
