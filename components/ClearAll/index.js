import React from "react";
import { connectCurrentRefinements } from "react-instantsearch-dom";

const Index = connectCurrentRefinements(
  ({ items, refine }) =>
    items.length > 0 && (
      <button
        onClick={() => refine(items)}
        className="tracking-tight mb-2 float-right text-orange-900 focus:outline-none hover:text-orange-800">
        Clear filters
      </button>
    )
);

export default Index;
