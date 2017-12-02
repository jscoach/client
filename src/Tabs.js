import React from "react";
import { connectMenu } from "react-instantsearch/connectors";

const TabItem = ({ label, value, isRefined, refine, createURL }) => (
  <a
    href={createURL(value)}
    onClick={e => {
      e.preventDefault();
      refine(value);
    }}
    className="no-underline text-black mb-2 inline-block"
    key={label}>
    <span className={`mx-2 ${isRefined && "font-bold"}`}>{label}</span>
  </a>
);

const Tabs = ({ attributeName, currentRefinement, items, ...otherProps }) => (
  <div className="inline-block">
    {items.length > 0 && (
      <TabItem label="All" value={null} isRefined={!currentRefinement} {...otherProps} />
    )}

    {items.map(item => <TabItem key={item.label} {...otherProps} {...item} />)}
  </div>
);

export default connectMenu(Tabs);
