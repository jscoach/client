import React from "react";
import {
  Hits,
  Menu,
  Pagination,
  Panel,
  PoweredBy,
  RefinementList,
  SearchBox,
  SortBy
} from "react-instantsearch/dom";

import Library from "./Library";

const Search = ({ sortOptions }) => {
  return (
    <div className="container">
      <SearchBox />

      <Menu attributeName="collections" />

      <SortBy items={sortOptions} defaultRefinement={sortOptions[0].value} />

      <Panel title="Categories">
        <Menu attributeName="categories" />
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
