import React from "react";
import { connectMenu } from "react-instantsearch/connectors";

const RadioItem = ({ label, value, count, isRefined, refine }) => (
  <div className="block mb-1">
    <label className="mr-2 cursor-pointer">
      <input
        className="mr-2"
        type="radio"
        checked={isRefined}
        onClick={e => {
          console.log("RIP");
          e.preventDefault();
          refine(value);
        }}
        onChange={() => {}}
      />
      {label}
    </label>
    {count && (
      <span className="px-2 rounded-full bg-grey-light text-grey-dark text-sm">
        {count}
      </span>
    )}
  </div>
);

const RadioList = ({
  attributeName,
  currentRefinement,
  items,
  ...otherProps
}) => (
  <div>
    {items.length === 0 && (
      <span className="text-grey-dark">No filters available</span>
    )}

    {items.map(item => (
      <RadioItem key={item.label} {...otherProps} {...item} />
    ))}
  </div>
);

export default connectMenu(RadioList);
