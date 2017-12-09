import React from "react";
import { Link, withRouter } from "react-router-dom";
import TimeAgo from "timeago-react";
import timeago from "timeago.js";
import Dropdown, { DropdownTrigger, DropdownContent } from "react-simple-dropdown";
import qs from "qs";
import "primer-tooltips/build/build.css";
import "react-simple-dropdown/styles/Dropdown.css";

import licenseUrl from "./license";
import pluralize from "./pluralize";
import humanizedNumber from "./humanizedNumber";
import Highlight from "./Highlight";

// Get these averages from the backend with `Package.published.average("stars")`
// A package is considered popular if any of the stats is above average
const averages = {
  stars: 277,
  downloads: 54408,
  dependents: 10,
};

const thresholds = {
  stars: 25,
  downloads: 250,
  dependents: 5,
};

const License = ({ id }) => (
  <a
    className="mr-4 px-1 tooltipped tooltipped-s tooltipped-multiline tooltipped-no-delay border rounded-sm text-sm truncate align-bottom no-underline text-inherit relative"
    style={{ maxWidth: 100, verticalAlign: 1 }}
    target="_blank"
    href={licenseUrl(id)}
    aria-label={`Licensed under ${id}\n(click to learn more)`}>
    {id}
  </a>
);

const Stars = ({ count }) => (
  <span
    className={`mr-4 tooltipped tooltipped-s tooltipped-no-delay ${
      count > thresholds.stars ? "text-orange-dark" : "text-grey-dark"
    }`}
    aria-label={`${count} ${pluralize(count, "star")} on GitHub${
      count > averages.stars ? " (above average)" : ""
    }`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12">
      <polygon points="6.285 9.644 10.169 12 9.138 7.561 12.57 4.573 8.051 4.188 6.285 .001 4.519 4.188 0 4.573 3.432 7.561 2.401 12" />
    </svg>{" "}
    {humanizedNumber(count)}
  </span>
);

const Downloads = ({ count }) => (
  <span
    className={`mr-4 tooltipped tooltipped-s tooltipped-multiline tooltipped-no-delay ${
      count > thresholds.downloads ? "text-teal-dark" : "text-grey-dark"
    }`}
    aria-label={`${count} ${pluralize(count, "download")} from npm\nin the last 30 days${
      count > averages.downloads ? " (above average)" : ""
    }`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
      <polygon points="12 6 9 6 9 1 3 1 3 6 0 6 6 12" />
    </svg>{" "}
    {humanizedNumber(count)}
  </span>
);

const Dependents = ({ count }) => (
  <span
    className={`mr-4 tooltipped tooltipped-s tooltipped-multiline tooltipped-no-delay ${
      count > thresholds.dependents ? "text-pink-dark" : "text-grey-dark"
    }`}
    aria-label={`${count} ${pluralize(count, "package")} ${pluralize(
      count,
      "depends",
      "depend"
    )} on this package${count > averages.dependents ? "\n(above average)" : ""}`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
      <path d="M5.49999938,1.5081529e-06 C5.39771197,1.5081529e-06 5.29651854,0.0249123286 5.20489747,0.0755206269 L0.295238654,2.78293348 C0.111586263,2.88428118 0,3.07989668 0,3.28285431 L0,8.71642868 C0,8.91964853 0.111723011,9.1052997 0.295238654,9.20704073 L5.20489747,11.9237624 C5.38739703,12.0254125 5.61273847,12.0254125 5.79523803,11.9237624 L10.7048968,9.20704073 C10.8878518,9.10601798 11.0004325,8.91885052 10.9999988,8.71642868 L10.9999988,3.28285431 C10.9999988,3.07963446 10.8884125,2.88428118 10.7048968,2.78293348 L5.79523803,0.0755206269 C5.70549329,0.02582561 5.60363639,-0.00022837378 5.49999938,1.5081529e-06 L5.49999938,1.5081529e-06 Z" />
    </svg>{" "}
    {humanizedNumber(count)}
  </span>
);

const CompatibilityIcon = ({ label, children }) => (
  <span
    className="mr-2 tooltipped tooltipped-s tooltipped-no-delay"
    aria-label={label}
    style={{ verticalAlign: -3 }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
      {children}
    </svg>
  </span>
);

const CompatibilityIcons = ({ expanded, repositoryUrl, android, ios, windows, css }) => (
  <div className={`inline-block ml-1 ${expanded ? "text-indigo-light" : "text-indigo-dark"}`}>
    {android && (
      <CompatibilityIcon label="Compatible with Android">
        <path d="M4,14 L5,14 L5,16.5 C5,17.33 5.67,18 6.5,18 C7.33,18 8,17.33 8,16.5 L8,14 L10,14 L10,16.5 C10,17.33 10.67,18 11.5,18 C12.33,18 13,17.33 13,16.5 L13,14 L14,14 C14.55,14 15,13.55 15,13 L15,9 L3,9 L3,13 C3,13.55 3.45,14 4,14 Z M0,10.5 L0,13.5 C0,14.33 0.446666667,15 1,15 C1.55333333,15 2,14.33 2,13.5 L2,10.5 C2,9.67 1.55333333,9 1,9 C0.446666667,9 0,9.67 0,10.5 Z M16,10.5 L16,13.5 C16,14.33 16.4466667,15 17,15 C17.5533333,15 18,14.33 18,13.5 L18,10.5 C18,9.67 17.5533333,9 17,9 C16.4466667,9 16,9.67 16,10.5 Z M12.53,3.16 L13.83,1.86 C14.03,1.66 14.03,1.35 13.83,1.15 C13.63,0.95 13.32,0.95 13.12,1.15 L11.64,2.63 C10.85,2.23 9.95,2 9,2 C8.04,2 7.14,2.23 6.34,2.63 L4.85,1.15 C4.65,0.95 4.34,0.95 4.14,1.15 C3.94,1.35 3.94,1.66 4.14,1.86 L5.45,3.17 C3.97,4.26 3,6.01 3,8 L15,8 C15,6.01 14.03,4.25 12.53,3.16 L12.53,3.16 Z M7,6 L6,6 L6,5 L7,5 L7,6 L7,6 Z M12,6 L11,6 L11,5 L12,5 L12,6 L12,6 Z" />
      </CompatibilityIcon>
    )}
    {ios && (
      <CompatibilityIcon label="Compatible with iOS">
        <path d="M11.6768092,1 C10.8738116,1.03230418 9.90185743,1.53618475 9.32529501,2.21283129 C8.80913502,2.81084754 8.35646455,3.7692079 8.47916253,4.68790306 C9.37470163,4.75748458 10.2892163,4.23115792 10.8467281,3.55550606 C11.4041481,2.8788595 11.7804565,1.93778804 11.6768092,1 L11.6768092,1 Z M11.3712614,4.85624031 C10.2370264,4.87157271 9.18594746,5.60197923 8.60527982,5.60197923 C7.97540322,5.60197923 7.00148948,4.88720495 5.9711483,4.90737326 C4.61480034,4.92754156 3.36631938,5.69690083 2.66802159,6.91305514 C1.26035791,9.36049013 2.30881854,12.9876885 3.67925299,14.9742758 C4.35038358,15.9453839 5.14941393,17.0392537 6.1998792,16.9989169 C7.21210915,16.9585801 7.59414835,16.3439534 8.81566637,16.3439534 C10.0371844,16.3439534 10.3813618,16.9991173 11.4509445,16.9799575 C12.5386392,16.9587805 13.2292274,15.9874773 13.8953271,15.0133435 C14.6640584,13.8859304 14.9818884,12.7951129 15,12.737633 C14.9758513,12.7275489 12.8787155,11.9219512 12.8565792,9.5007351 C12.838468,7.47582806 14.5066287,6.5037002 14.5820931,6.45630431 C13.6433154,5.0798112 12.1825391,4.8910653 11.6613313,4.86887984 C11.5642494,4.85903199 11.467383,4.85494077 11.3712614,4.85624031 L11.3712614,4.85624031 Z" />
      </CompatibilityIcon>
    )}
    {windows && (
      <CompatibilityIcon label="Compatible with Windows">
        <path d="M2,4.8369431 L7.11068182,3.71404545 L7.11422727,9 L2.00740909,9 L2,4.8369431 Z M7.10681818,10.0525044 L7.11311364,15.8800001 L2.00629545,14.7658207 L2.00584091,10 L7.10681818,10.0525044 Z M8.09002273,3.56899679 L15.8441136,2 L15.8441136,9 L8.09002273,9 L8.09002273,3.56899679 Z M15.8466136,10.0175909 L15.8440909,17.4130455 L8.07493182,16.0820312 L8.07493182,10 L15.8466136,10.0175909 Z" />
      </CompatibilityIcon>
    )}
    {css && (
      <a
        className="text-grey-dark"
        href={`${repositoryUrl}/search?${qs.stringify({
          q: "language:css language:sass language:scss language:less",
        })}`}
        target="_blank">
        <CompatibilityIcon label="Includes CSS files (click for details)">
          <polygon points="3.53 2 2.959 5 14.575 5 14.213 7 2.589 7 2.026 10.139 13.642 10.139 13 12 8 13.5 4.533 12 1.679 12 1 14.12 7.5 17 15.447 14.12 18 2" />
        </CompatibilityIcon>
      </a>
    )}
  </div>
);

const ExternalLinks = ({ name, homepage, repositoryUrl, donationUrl }) => (
  <div className="ml-3 float-right">
    {true && (
      <a
        className="btn btn-primary bg-green hover:bg-green-dark mr-1 py-2 px-3 tooltipped tooltipped-s tooltipped-no-delay"
        aria-label={"Appears to collect donations\non this website"}
        href={donationUrl}
        target="_blank"
        rel="noopener noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          style={{ verticalAlign: -2 }}>
          <path d="M11,24 L11,20.978 L10,20.978 L10,24 L8,24 L8,20.978 L3.031,20.978 L3.531,18 L4.61,18 C5.494,18 6,17.149 6,16.293 L6,7.404 C6,6.571 5.515,6 4.635,6 L3,6 L3,3 L8,3 L8,0 L10,0 L10,3 L11,3 L11,0 L13,0 L13,3.053 C17.315,3.199 19.024,4.834 19.514,6.678 C20.094,8.858 18.657,10.688 17.421,11.134 C18.922,11.516 21,12.625 21,15.184 C21,18.667 18.312,21 13,21 L13,24 L11,24 Z M10,12.994 L10,18 C13.969,18 16.688,17.625 16.688,15.484 C16.688,13.188 13.75,12.994 10,12.994 Z M10,11 C12.211,11 15.578,10.844 15.578,8.5 C15.578,6.5 13.5,6 10,6 L10,11 Z" />
        </svg>
      </a>
    )}
    {repositoryUrl && (
      <a
        className="btn btn-primary mr-1 py-2 px-3 tooltipped tooltipped-s tooltipped-no-delay"
        aria-label="Visit homepage"
        href={homepage}
        target="_blank"
        rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13">
          <polygon points="6.118 13 6.118 8.412 9.176 8.412 9.176 13 13 13 13 6.882 15.294 6.882 7.647 0 0 6.882 2.294 6.882 2.294 13" />
        </svg>
      </a>
    )}
    <div className="inline-block relative">
      <a className="btn btn-primary py-2 px-3 rounded-r-none" href={repositoryUrl} target="_blank">
        View on GitHub
      </a>
      <Dropdown>
        <DropdownTrigger className="btn btn-primary p-2 border-l border-indigo-darker rounded-l-none">
          <svg
            width="13"
            height="13"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            style={{ verticalAlign: -1 }}>
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </DropdownTrigger>
        <DropdownContent className="dropdown-content pin-r pin-l mt-1">
          <ul className="list-reset">
            <li>
              <a
                href={`https://www.npmjs.com/package/${name}`}
                target="_blank"
                className="dropdown-item pt-3">
                View on NPM
              </a>
            </li>
            <li>
              <a href={`https://yarn.pm/${name}`} target="_blank" className="dropdown-item">
                View on Yarn
              </a>
            </li>
            <li>
              <a href={`https://npm.runkit.com/${name}`} target="_blank" className="dropdown-item">
                Try on RunKit
              </a>
            </li>
            <li>
              <a
                href={`https://www.jsdelivr.com/package/npm/${name}`}
                target="_blank"
                className="dropdown-item pb-3">
                Get from jsDelivr
              </a>
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>
  </div>
);

const Hit = withRouter(({ hit, location, expanded }) => {
  const popular =
    hit.stars > averages.stars ||
    hit.downloads > averages.downloads ||
    hit.dependents > averages.dependents;

  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  const outdated = new Date(hit.pushedAt) < twoYearsAgo;

  return (
    <div
      className={
        expanded
          ? "bg-grey-darkest px-8 py-6 text-grey-light rounded-t"
          : `relative bg-white text-black p-3 hover:bg-grey-lighter rounded w-full ${
              outdated ? "opacity-50 hover:opacity-100" : ""
            }`
      }>
      {!expanded && (
        <Link className="pin absolute z-10" to={{ pathname: hit.name, search: location.search }} />
      )}
      <div className="mb-2">
        {expanded && <ExternalLinks {...hit} />}

        {hit.collections.length > 0 && (
          <div className="text-grey text-sm mb-1">
            <span className="pr-2">{hit.collections.join(", ")}</span>
            {hit.communityPick && <span className="text-green">Community pick</span>}
            {!hit.communityPick && popular && <span className="text-green pr-2">Popular</span>}
            {!hit.communityPick &&
              !popular &&
              outdated && <span className="text-red pr-2">Outdated</span>}
          </div>
        )}
        <div className="text-grey-dark">
          <Link
            to={{ pathname: hit.name, search: location.search }}
            className={
              expanded ? "text-white no-underline" : "text-blue-dark visited no-underline"
            }>
            <strong className={expanded ? "pr-2 text-xl" : "pr-2 text-lg"}>
              <Highlight attributeName="name" hit={hit} tagName="mark" />
            </strong>
          </Link>
          v{hit.latestRelease} {hit.modifiedAt === hit.publishedAt ? "published " : "updated "}
          <TimeAgo
            datetime={hit.modifiedAt}
            className="cursor-default z-30 tooltipped tooltipped-s tooltipped-multiline tooltipped-no-delay"
            aria-label={`Updated release ${timeago().format(
              hit.modifiedAt
            )}\nFirst published ${timeago().format(
              hit.publishedAt
            )}\nLatest commit ${timeago().format(hit.pushedAt)}`}
          />{" "}
          <span className="mr-1">by </span>
          <div
            style={{
              backgroundImage: `url(${hit.repositoryUserAvatar}&s=28)`,
              filter: "grayscale(0.2)",
              backgroundSize: 14,
              width: 14,
              height: 14,
              verticalAlign: -2,
            }}
            className="rounded-sm mr-1 bg-grey-lighter inline-block"
          />
          <span>{hit.repositoryUser}</span>
        </div>
      </div>

      <p className="mb-2 leading-tight">
        <Highlight attributeName="description" hit={hit} tagName="mark" />
      </p>

      <div className="cursor-default z-20 relative inline-block">
        {hit.license && <License id={hit.license} />}

        <Stars count={hit.stars} />
        <Downloads count={hit.downloads} />
        <Dependents count={hit.dependents} />

        <CompatibilityIcons
          expanded={expanded}
          android={hit.compatibility.indexOf("Android") >= 0}
          ios={hit.compatibility.indexOf("iOS") >= 0}
          windows={hit.compatibility.indexOf("Windows") >= 0}
          css={hit.styling.indexOf("Inline Styles") < 0 && hit.collections.indexOf("React") >= 0}
          repositoryUrl={`https://github.com/${hit.repositoryUser}/${hit.repositoryName}`}
        />
      </div>
    </div>
  );
});

export default Hit;
