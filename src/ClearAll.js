import React from "react";
import { connectCurrentRefinements } from "react-instantsearch/connectors";

const ClearAll = connectCurrentRefinements(
  ({ items, refine }) =>
    items.length > 0 && (
      <button
        onClick={() => refine(items)}
        className="tracking-tight mb-2 float-right text-orange-dark"
      >
        Clear filters
      </button>
    )
);

export default ClearAll;
