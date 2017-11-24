import React from "react";
import { connectMenu } from "react-instantsearch/connectors";

const TabItem = ({ label, value, count, isRefined, refine, createURL }) => (
  <a
    href={createURL(value)}
    onClick={e => {
      e.preventDefault();
      refine(value);
    }}
    className="no-underline text-black mb-2 inline-block"
    key={label}
  >
    <span className={`mr-1 ml-3 ${isRefined && "font-semibold"}`}>{label}</span>
    {count && (
      <span className="mr-1 px-2 rounded-full bg-grey-light text-grey-dark text-sm">
        {count}
      </span>
    )}
  </a>
);

const Tabs = ({ attributeName, currentRefinement, items, ...otherProps }) => (
  <div>
    {items.length > 0 && (
      <TabItem
        label="Everything"
        value={null}
        isRefined={!currentRefinement}
        {...otherProps}
      />
    )}

    {items.map(item => <TabItem key={item.label} {...otherProps} {...item} />)}
  </div>
);

export default connectMenu(Tabs);
