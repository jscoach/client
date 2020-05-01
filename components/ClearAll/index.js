import React from "react";
import { connectCurrentRefinements } from "react-instantsearch-dom";

const Index = connectCurrentRefinements(
  ({ items, refine }) =>
    items.length > 0 && (
      <button
        onClick={() => refine(items)}
        className="tracking-tight mb-2 sticky right-0 bg-gray-200 border-l border-gray-300 md:border-l-0 px-4 text-orange-900 focus:outline-none hover:text-orange-800">
        Clear filters
      </button>
    )
);

export default Index;
