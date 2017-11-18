import React from "react";
import { Highlight } from "react-instantsearch/dom";

const Library = ({ hit }) => {
  return (
    <a href={hit.repositoryUrl}>
      <div>
        <div>Filed under {hit.collections}</div>
        <strong>
          <Highlight attributeName="name" hit={hit} />
        </strong>
        <em>
          {hit.modifiedAt} by {hit.owner}
        </em>
      </div>
      <div>{hit.description}</div>
      <div>
        <span>{hit.stars} stars </span>
        <span>{hit.downloads} downloads </span>
        <span>{hit.dependents} dependents </span>
      </div>
    </a>
  );
};

export default Library;
