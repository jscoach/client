import React from "react";
import { connectHighlight } from 'react-instantsearch-dom';

const Highlight = ({highlight, attribute, hit}) => {
  const parsedHit = highlight({
    attribute,
    hit,
    highlightProperty: "_highlightResult",
  });
  return parsedHit.map((part, index) => part.isHighlighted ? (
      <mark key={index}>{part.value}</mark>
    ) : (
      <span key={index}>{part.value}</span>
    )
  );
};

export default connectHighlight(Highlight);
