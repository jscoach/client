import React from "react";
import { connectMenu } from "react-instantsearch-dom";

const MenuItem = ({label, value, count, isRefined, refine, createURL}) => (
  <a
    href={createURL(value)}
    onClick={e => {
      e.preventDefault();
      refine(value);
    }}
    className="block no-underline text-gray-800 mb-2 rounded hover:text-gray-900"
    key={label}>
    <span className={`mr-2 ${isRefined && "font-bold"}`}>{label}</span>
    {count > 0 && (
      <span className="px-2 rounded-full bg-gray-200 text-gray-900 text-sm">{count}</span>
    )}
  </a>
);

const Index = ({attribute, currentRefinement, items, ...otherProps}) => (
  <>
    {items.length === 0 && <span className="text-gray-800">No filters available</span>}

    {items.length > 0 && (
      <MenuItem
        label="All"
        value={null}
        isRefined={!currentRefinement && items.length}
        {...otherProps}
      />
    )}

    {items.map(item => <MenuItem key={item.label} {...otherProps} {...item} />)}
  </>
);

export default connectMenu(Index);
