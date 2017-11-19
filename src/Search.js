import React from "react";

import Hits from "./Hits";
import Menu from "./Menu";
import Panel from "./Panel";
import RefinementList from "./RefinementList";
import SearchBox from "./SearchBox";
import SearchPoweredBy from "./SearchPoweredBy";
import ClearAll from "./ClearAll";
import SortBy from "./SortBy";

const Search = ({ sortOptions }) => {
  return (
    <div className="flex flex-row max-w-xl mx-auto">
      <div className="m-4 md:w-full">
        <SearchBox />
        <Hits />
        <SearchPoweredBy />
      </div>

      <div className="m-4 md:w-64 pt-4">
        <div className="text-lg mb-8">
          <Menu attributeName="collections" showAllLabel="Everything" noResultsLabel="Everything" />
        </div>

        <div className="mb-8">
          <Panel title="Categories">
            <Menu attributeName="categories" />
          </Panel>
        </div>

        <div className="mb-8">
          <Panel title="Filters">
            <RefinementList attributeName="filters" operator="and" />
          </Panel>
        </div>

        <SortBy items={sortOptions} defaultRefinement={sortOptions[0].value} />
        <ClearAll />
      </div>
    </div>
  );
};

export default Search;
