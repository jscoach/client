import React from "react";
import { Link, withRouter } from "react-router-dom";
import TimeAgo from "react-timeago";

import humanizedNumber from "./humanizedNumber";
import Highlight from "./Highlight";

const pluralize = (count, singular, plural = `${singular}s`) =>
  count === 1 ? singular : plural;

const Hit = withRouter(({ hit, history, location }) => (
  <div className="relative bg-white block text-black p-3 hover:bg-grey-lighter rounded w-full">
    <Link
      className="pin absolute z-10"
      to={{ pathname: hit.name, search: location.search }}
    />

    <div className="mb-2">
      {hit.collections.length > 0 && (
        <div className="text-grey text-sm mb-1">
          {hit.collections.join(", ")}
        </div>
      )}
      <Link
        to={{ pathname: hit.name, search: location.search }}
        className="text-blue-dark visited no-underline"
      >
        <strong className="pr-2 text-lg">
          <Highlight attributeName="name" hit={hit} tagName="mark" />
        </strong>
      </Link>
      <em className="roman text-grey-dark">
        v{hit.latestRelease} published{" "}
        <TimeAgo date={hit.modifiedAt} minPeriod="5" /> by {hit.repositoryUser}
      </em>
    </div>

    <p className="mb-2 leading-tight">
      <Highlight attributeName="description" hit={hit} tagName="mark" />
    </p>

    <div>
      {hit.license && (
        <a
          className="inline-block mr-2 px-1 border rounded-sm text-sm truncate align-bottom no-underline text-black z-20 relative"
          style={{ maxWidth: 100 }}
          target="_blank"
          href={`https://spdx.org/licenses/${hit.license}.html`}
        >
          {hit.license}
        </a>
      )}

      <span
        className="text-orange-dark pr-2"
        title={`${hit.stars} ${pluralize(hit.stars, "star")} on GitHub`}
      >
        {humanizedNumber(hit.stars)} {pluralize(hit.stars, "star")}
      </span>
      <span
        className="text-teal-dark pr-2"
        title={`${hit.downloads} ${pluralize(
          hit.downloads,
          "download"
        )} from NPM in the last month`}
      >
        {humanizedNumber(hit.downloads)} {pluralize(hit.downloads, "download")}/mo
      </span>
      <span
        className="text-purple-dark"
        title={`${hit.dependents} ${pluralize(
          hit.dependents,
          "library",
          "libraries"
        )} depend on this library`}
      >
        {humanizedNumber(hit.dependents)}{" "}
        {pluralize(hit.dependents, "dependent")}
      </span>
    </div>
  </div>
));

export default Hit;
