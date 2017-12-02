import React from "react";
import { connectHighlight } from "react-instantsearch/connectors";

const Highlight = connectHighlight(({ highlight, attributeName, hit, highlightProperty }) => {
  const parsedHit = highlight({
    attributeName,
    hit,
    highlightProperty: "_highlightResult",
  });
  const highlightedHits = parsedHit.map(part => {
    if (part.isHighlighted) return `<mark>${part.value}</mark>`;
    return part.value;
  });
  return <span dangerouslySetInnerHTML={{ __html: highlightedHits.join("") }} />;
});

export default Highlight;
