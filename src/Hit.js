import React from "react";
import { Highlight } from "react-instantsearch/dom";

const Hit = ({ hit }) => {
  return (
    <a
      className="bg-white block no-underline text-black border border-t-0 p-3 hover:bg-grey-lightest"
      href={hit.repositoryUrl}
      target="_blank"
    >
      <div className="mb-1">
        {hit.collections.length > 0 && (
          <div className="text-grey text-sm mb-2">
            Filed under {hit.collections}
          </div>
        )}
        <strong className="pr-2 text-lg">
          <Highlight attributeName="name" hit={hit} />
        </strong>
        <em className="roman text-grey-dark">
          v{hit.latestRelease} published {hit.modifiedAt} by {hit.owner}
        </em>
      </div>

      <div
        className="mb-2"
        dangerouslySetInnerHTML={{ __html: hit.description }}
      />

      <div>
        <span className="text-orange-dark pr-2">{hit.stars} stars</span>
        <span className="text-teal-dark pr-2">{hit.downloads} downloads</span>
        <span className="text-purple-dark">{hit.dependents} dependents</span>
      </div>
    </a>
  );
};

export default Hit;
