import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";

const CheckBoxItem = ({ label, value, count, isRefined, refine }) => (
  <div className="block mb-1">
    <label className="mr-2 cursor-pointer">
      <input
        className="mr-2"
        type="checkbox"
        checked={isRefined}
        onChange={e => {
          e.preventDefault();
          refine(value);
        }}
      />
      {label}
    </label>
    {count > 0 && (
      <span className="px-2 rounded-full bg-gray-200 text-gray-900 text-sm">{count}</span>
    )}
  </div>
);

const Index = connectRefinementList(({ items, attribute, refine, createURL }) => (
  <>
    {items.length === 0 && <span className="text-gray-900">No filters available</span>}

    {items.map(item => (
      <CheckBoxItem key={item.label} refine={refine} createURL={createURL} {...item} />
    ))}
  </>
));

export default Index;
