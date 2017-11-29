import React from "react";

import ClearAll from "./ClearAll";
import Hits from "./Hits";
import Menu from "./Menu";
import Panel from "./Panel";
import CheckboxList from "./CheckboxList";
import RadioList from "./RadioList";
import SearchBox from "./SearchBox";
import SearchPoweredBy from "./SearchPoweredBy";
import SortBy from "./SortBy";
import Tabs from "./Tabs";
import Topbar from "./Topbar";
import orderBy from "lodash.orderby";

import jess from "./images/jess.svg";
import jessSmall from "./images/jess-small.svg";

const Search = ({
  isHome,
  currentCollection,
  collectionsOrder,
  sortOptions
}) => (
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
            ? "text-center m-8 select-none max-w-md w-full"
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

        <div className={isHome ? "placeholder-center" : "ml-16 max-w-md"}>
          <SearchBox />
          <div className={isHome ? "mt-4" : "mt-4 ml-1"}>
            <Tabs
              attributeName="collections"
              transformItems={items =>
                items.sort(
                  (a, b) =>
                    collectionsOrder.indexOf(a.label) >
                    collectionsOrder.indexOf(b.label)
                )
              }
            />
            <ClearAll />
          </div>
        </div>
      </div>
    </div>

    {!isHome && (
      <div className="flex p-4 pt-3">
        <div className="ml-16 max-w-md w-full">
          <SortBy
            items={sortOptions}
            defaultRefinement={sortOptions[0].value}
          />
          <Hits />
          <SearchPoweredBy />
        </div>

        <div className="ml-8 pl-4 mt-8 pt-3 flex-none">
          {currentCollection === "React" && (
            <div className="mb-8">
              <Panel title="Styling">
                <RadioList attributeName="styling" operator="and" />
              </Panel>
            </div>
          )}

          {currentCollection === "React Native" && (
            <div className="mb-8">
              <Panel title="Platforms">
                <CheckboxList attributeName="platforms" />
              </Panel>
            </div>
          )}

          <div className="mb-8">
            <Panel title="Categories">
              <Menu
                attributeName="categories"
                showMore
                limitMax={25}
                transformItems={items =>
                  orderBy(items, ["label", "count"], ["asc", "desc"])
                }
              />
            </Panel>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default Search;
