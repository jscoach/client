import React from "react";
import { Link, withRouter } from "react-router-dom";
import TimeAgo from "react-timeago";
import "primer-tooltips/build/build.css";

import humanizedNumber from "./humanizedNumber";
import Highlight from "./Highlight";

const pluralize = (count, singular, plural = `${singular}s`) =>
  count === 1 ? singular : plural;

// Get these averages from the backend with `Package.published.average("stars")`
const averages = {
  stars: 277,
  downloads: 54408,
  dependents: 10
}

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
        v{hit.latestRelease}{" "}
        {hit.modifiedAt === hit.publishedAt ? "published " : "updated "}
        <TimeAgo date={hit.modifiedAt} minPeriod="5" /> by {hit.repositoryUser}
      </em>
    </div>

    <p className="mb-2 leading-tight">
      <Highlight attributeName="description" hit={hit} tagName="mark" />
    </p>

    <div>
      {hit.license && (
        <a
          className="inline-block mr-4 px-1 border rounded-sm text-sm truncate align-bottom no-underline text-black z-20 relative"
          style={{ maxWidth: 100 }}
          target="_blank"
          href={`https://spdx.org/licenses/${hit.license}.html`}
        >
          {hit.license}
        </a>
      )}

      <span
        className={`pr-4 z-20 tooltipped tooltipped-s cursor-help ${
          hit.stars > averages.stars ? "text-orange-dark" : "text-grey-dark"
        }`}
        aria-label={`${hit.stars} ${pluralize(hit.stars, "star")} on GitHub${
          hit.stars > averages.stars ? " (above average)" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="12"
          viewBox="0 0 13 12"
        >
          <polygon
            points="6.285 9.644 10.169 12 9.138 7.561 12.57 4.573 8.051 4.188 6.285 .001 4.519 4.188 0 4.573 3.432 7.561 2.401 12"
          />
        </svg>{" "}
        {humanizedNumber(hit.stars)}
      </span>
      <span
        className={`pr-4 z-20 tooltipped tooltipped-s tooltipped-multiline cursor-help ${
          hit.downloads > averages.downloads ? "text-teal-dark" : "text-grey-dark"
        }`}
        aria-label={`${hit.downloads} ${pluralize(
          hit.downloads,
          "download"
        )} from NPM in the last 30 days${
          hit.downloads > averages.downloads ? " (above average)" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <polygon points="12 6 9 6 9 1 3 1 3 6 0 6 6 12" />
        </svg>{" "}
        {humanizedNumber(hit.downloads)}
      </span>
      <span
        className={`pr-4 z-20 tooltipped tooltipped-s tooltipped-multiline cursor-help ${
          hit.dependents > averages.dependents ? "text-purple-dark" : "text-grey-dark"
        }`}
        aria-label={`${hit.dependents} ${pluralize(
          hit.dependents,
          "package",
          "packages"
        )} depend on this package${
          hit.dependents > averages.dependents ? " (above average)" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <path d="M5.49999938,1.5081529e-06 C5.39771197,1.5081529e-06 5.29651854,0.0249123286 5.20489747,0.0755206269 L0.295238654,2.78293348 C0.111586263,2.88428118 0,3.07989668 0,3.28285431 L0,8.71642868 C0,8.91964853 0.111723011,9.1052997 0.295238654,9.20704073 L5.20489747,11.9237624 C5.38739703,12.0254125 5.61273847,12.0254125 5.79523803,11.9237624 L10.7048968,9.20704073 C10.8878518,9.10601798 11.0004325,8.91885052 10.9999988,8.71642868 L10.9999988,3.28285431 C10.9999988,3.07963446 10.8884125,2.88428118 10.7048968,2.78293348 L5.79523803,0.0755206269 C5.70549329,0.02582561 5.60363639,-0.00022837378 5.49999938,1.5081529e-06 L5.49999938,1.5081529e-06 Z" />
        </svg>{" "}
        {humanizedNumber(hit.dependents)}
      </span>
    </div>
  </div>
));

export default Hit;
