import React from "react";
import { connectMenu } from "react-instantsearch/connectors";

const MenuItem = ({ label, value, count, isRefined, refine, createURL }) => (
  <a
    href={createURL(value)}
    onClick={e => {
      e.preventDefault();
      refine(value);
    }}
    className="block no-underline text-black mb-2"
    key={label}
  >
    <span className={`mr-2 ${isRefined && "font-semibold"}`}>{label}</span>
    {count && (
      <span className="px-2 rounded-full bg-grey-light text-grey-dark text-sm">
        {count}
      </span>
    )}
  </a>
);

const Menu = ({
  attributeName,
  currentRefinement,
  items,
  showAllLabel,
  noResultsLabel,
  ...otherProps
}) => (
  <div>
    {items.length === 0 && (
      <span className="text-grey-dark">{noResultsLabel || `No ${attributeName}`}</span>
    )}

    {items.length > 0 && (
      <MenuItem
        label={showAllLabel}
        value={null}
        isRefined={!currentRefinement && items.length}
        {...otherProps}
      />
    )}

    {items.map(item => <MenuItem key={item.label} {...otherProps} {...item} />)}
  </div>
);

Menu.defaultProps = {
  showAllLabel: "All"
};

export default connectMenu(Menu);
