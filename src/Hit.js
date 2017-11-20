import React from "react";
import { withRouter } from "react-router-dom";
import { Highlight } from "react-instantsearch/dom";
import TimeAgo from "react-timeago";

const Hit = withRouter(({ hit, history, location }) => (
  <a
    className="bg-white block no-underline text-black border border-t-0 p-3 hover:bg-grey-lightest"
    href={hit.repositoryUrl}
    target="_blank"
    onClick={e => {
      e.preventDefault();
      history.push({
        pathname: `/${hit.name}`,
        search: location.search
      });
    }}
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
        v{hit.latestRelease} published{" "}
        <TimeAgo date={hit.modifiedAt} minPeriod="5" /> by {hit.owner}
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
));

export default Hit;
