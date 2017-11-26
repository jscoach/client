import React from "react";
import { connectSortBy } from "react-instantsearch/connectors";

const SortBy = connectSortBy(({ items, currentRefinement, refine }) => (
  <div className="inline-block relative m-3 mt-0 text-sm">
    <select
      className="block appearance-none bg-transparent text-grey-dark cursor-pointer pr-4 tracking-tight"
      value={currentRefinement}
      onChange={e => {
        e.preventDefault();
        refine(e.target.value);
      }}
    >
      {items.map(item => (
        <option key={item.value} value={item.value}>
          Sort by {item.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute pin-y pin-r flex items-center text-grey-dark">
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
));

export default SortBy;
