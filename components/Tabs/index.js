import React from "react";
import { connectMenu } from "react-instantsearch-dom";

const TabItem = ({label, value, isRefined, refine, createURL}) => (
  <a
    href={createURL(value)}
    onClick={e => {
      e.preventDefault();
      refine(value);
    }}
    className={`no-underline text-black pb-2 border-b border-transparent inline-block hover:border-orange-500 ${isRefined && "font-bold border-orange-700"}`}
    key={label}>
    <span className={`mx-2`}>{label}</span>
  </a>
);

const Tabs = ({currentRefinement, items, ...otherProps}) => {
  return (
    <div className="inline-block">
      {items.length > 0 && (
        <TabItem label="All" value={null} isRefined={!currentRefinement} {...otherProps} />
      )}

      {items.map(item => <TabItem key={item.label} {...otherProps} {...item} />)}
    </div>
  );
};

export default connectMenu(Tabs);
