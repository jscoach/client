import React from "react";

import ClearAll from "./ClearAll";
import Hits from "./Hits";
import Menu from "./Menu";
import Panel from "./Panel";
import RefinementList from "./RefinementList";
import SearchBox from "./SearchBox";
import SearchPoweredBy from "./SearchPoweredBy";
import SortBy from "./SortBy";
import Tabs from "./Tabs";
import Topbar from "./Topbar";

import jess from "./images/jess.svg";
import jessSmall from "./images/jess-small.svg";

const Search = ({ isHome, sortOptions }) => {
  return (
    <div>
      <Topbar />

      <div
        className={
          isHome
            ? "flex justify-center items-center"
            : "bg-grey-lighter border-b overflow-hidden"
        }
        style={isHome ? { minHeight: "calc(100vh - 100px)" } : {}}
      >
        <div
          className={
            isHome
              ? "text-center p-8 select-none max-w-md w-full"
              : "relative m-4 mb-1"
          }
        >
          {isHome ? (
            <img
              src={jess}
              width="128"
              height="152"
              className="m-8"
              alt="Coach Jess welcomes you!"
              draggable="false"
            />
          ) : (
            <a href="/">
              <img
                src={jessSmall}
                width="50"
                height="50"
                className="absolute pin-l"
                draggable="false"
                alt="Coach Jess welcomes you!"
              />
            </a>
          )}

          <div className={isHome ? "" : "ml-16 max-w-md"}>
            <SearchBox />
            <div className="mt-4">
              <Tabs attributeName="collections" />
            </div>
          </div>
        </div>
      </div>

      {!isHome && (
        <div className="flex p-4">
          <div className="ml-16 max-w-md w-full">
            <Hits />
            <SearchPoweredBy />
          </div>

          <div className="m-4 flex-none">
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

            <SortBy
              items={sortOptions}
              defaultRefinement={sortOptions[0].value}
            />
            <ClearAll />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
