import React from "react";
import { Link, withRouter } from "react-router-dom";
import TimeAgo from "react-timeago";
import numeral from "numeral";

import Highlight from "./Highlight";

// This converts a number such as 4200 to 4.2K and 1004 to 1K
const format = "0[.]0a";

const pluralize = (count, singular, plural = `${singular}s`) =>
  count === 1 ? singular : plural;

const Hit = withRouter(({ hit, history, location }) => (
  <Link
    className="bg-white block no-underline text-black p-3 hover:bg-grey-lighter rounded w-full"
    to={{ pathname: hit.name, search: location.search }}
  >
    <div className="mb-1">
      {hit.collections.length > 0 && (
        <div className="text-grey text-sm mb-1">
          {hit.collections.join(", ")}
        </div>
      )}
      <strong className="pr-2 text-lg">
        <Highlight attributeName="name" hit={hit} tagName="mark" />
      </strong>
      <em className="roman text-grey-dark">
        v{hit.latestRelease} published{" "}
        <TimeAgo date={hit.modifiedAt} minPeriod="5" /> by {hit.repositoryUser}
      </em>
    </div>

    <Highlight attributeName="description" hit={hit} tagName="mark" />

    <div className="mt-2">
      <span
        className="text-orange-dark pr-2"
        title={`${hit.stars} ${pluralize(hit.stars, "star")} on GitHub`}
      >
        {numeral(hit.stars).format(format)} {pluralize(hit.stars, "star")}
      </span>
      <span
        className="text-teal-dark pr-2"
        title={`${hit.downloads} ${pluralize(
          hit.downloads,
          "download"
        )} from NPM in the last month`}
      >
        {numeral(hit.downloads).format(format)}{" "}
        {pluralize(hit.downloads, "download")}/mo
      </span>
      <span
        className="text-purple-dark"
        title={`${hit.dependents} ${pluralize(
          hit.dependents,
          "library",
          "libraries"
        )} depend on this library`}
      >
        {numeral(hit.dependents).format(format)}{" "}
        {pluralize(hit.dependents, "dependent")}
      </span>
    </div>
  </Link>
));

export default Hit;
