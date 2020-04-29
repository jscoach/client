import React from "react";
import ClearAll from "../ClearAll";
import Hits from "../Hits";
import Menu from "../Menu";
import Panel from "../Panel";
import CheckboxList from "../CheckboxList";
import SearchBox from "../SearchBox";
import SearchPoweredBy from "../SearchPoweredBy";
import SortBy from "../SortBy";
import Tabs from "../Tabs";
import orderBy from "lodash.orderby";
import Advertisement from "../Advertisement";

function Search({currentCollection, currentQuery, collectionsOrder, sortOptions}) {
  return <>
    <div className="bg-gray-200 border-b border-gray-300  overflow-hidden">
      <div className="container mx-auto">
        <div className="relative m-4 mb-0 select-none">
          <a href="/" className="hidden md:inline">
            <img
              src="images/jess-small.svg"
              width="50"
              height="50"
              className="absolute left-0 inline"
              draggable="false"
              alt="Coach Jess welcomes you!"
            />
          </a>
          <div className="max-w-2xl">
            <SearchBox/>
            <div className="md:ml-16 mt-6 overflow-x-scroll whitespace-no-wrap">
              <Tabs
                attribute="collections"
                items={collectionsOrder}
                transformItems={items =>
                  items.sort(
                    (a, b) => collectionsOrder.indexOf(a.label) > collectionsOrder.indexOf(b.label)
                  )
                }
              />
              <ClearAll/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap p-4 pt-3 container mx-auto">
      <div className="w-full sm:w-9/12 lg:w-8/12 md:pl-16">
        <SortBy
          items={sortOptions}
          defaultRefinement={
            // Sort by relevance by default if it's a search, or updated at if browsing
            // Make sure the default matches the indexName prop on the InstantSearch component
            sortOptions[currentQuery ? 0 : 1].value
          }
        />
        <Hits/>
        <SearchPoweredBy/>
      </div>

      <div className="w-full sm:w-3/12 lg:w-4/12 pl-4 pt-2">

        {(currentCollection === "React" || currentCollection === "Vue") && (
          <Panel title="Styling">
            <CheckboxList
              attribute="styling"
              operator="and"
              transformItems={items => orderBy(items, ["label", "count"], ["asc", "desc"])}
            />
          </Panel>
        )}

        {currentCollection === "React Native" && (
          <Panel title="Compatibility">
            <CheckboxList
              attribute="compatibility"
              transformItems={items =>
                orderBy(items, [item => item.label.toLowerCase()], ["asc"])
              }
            />
          </Panel>
        )}

        <Panel title="Categories">
          <Menu
            attribute="categories"
            showMore
            limitMax={25}
            transformItems={items => orderBy(items, ["label", "count"], ["asc", "desc"])}
          />
        </Panel>
        <div className="my-8 mx-auto">
          <Advertisement/>
        </div>
      </div>
    </div>
  </>;
}

export default Search;
