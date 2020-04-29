import React from "react";
import TimeAgo from "timeago-react";
import { format } from 'timeago.js';
import CompatibilityIcons from "./CompatibilityIcons";
import Stars from "./Stars";
import Downloads from "./Downloads";
import License from "./License";
import { averages } from "./constants";
import Link from 'next/link'
import { Highlight } from 'react-instantsearch-dom';

const Hit = ({hit, location}) => {
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
        `relative bg-white text-black p-3 hover:bg-gray-100 rounded w-full`
      }>
      {/*{!expanded && (*/}
      {/*  <Link className="inset-0 absolute z-10" to={{ pathname: hit.name, search: location.search }} />*/}
      {/*)}*/}
      <div className="mb-2">
        {hit.collections.length > 0 && (
          <div className="text-gray-600 text-sm mb-1">
            <span className="pr-2">{hit.collections.join(", ")}</span>
            {hit.communityPick && <span className="text-green-900">Community pick</span>}
            {!hit.communityPick && popular && <span className="text-orange-900 pr-2">Popular</span>}
            {!hit.communityPick &&
            !popular &&
            outdated && <span className="text-red-700 pr-2">Outdated</span>}
          </div>
        )}
        <div className="text-gray-700">
          <Link
            as={'/package/' + hit.name}
            href={'/package?objectID=' + hit.objectID}
            passHref
          >
            <a
              className={"text-blue-600 hover:text-blue-700 focus:text-blue-800 visited no-underline"}>
              <strong className={"pr-2 text-lg"}>
                <Highlight attribute="name" hit={hit} tagName="mark"/>
              </strong>
            </a>
          </Link>
          v{hit.latestRelease} {hit.modifiedAt === hit.publishedAt ? "published " : "updated "}
          <TimeAgo
            datetime={hit.modifiedAt}
            className="cursor-default z-30 tooltipped tooltipped-s tooltipped-multiline tooltipped-no-delay"
            aria-label={`Updated release ${format(hit.modifiedAt)}\nFirst published ${format(
              hit.publishedAt
            )}\nLatest commit ${format(hit.pushedAt)}`}
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
            className="rounded-sm mr-1 bg-gray-100 inline-block"
          />
          <span>{hit.repositoryUser}</span>
        </div>
      </div>

      <p className="mb-2 leading-tight">
        <Highlight attribute="description" hit={hit} tagName="mark"/>
      </p>

      <div className="cursor-default z-20 relative flex flex-row items-center">
        {hit.license && <License id={hit.license}/>}

        <Stars count={hit.stars}/>
        <Downloads count={hit.downloads}/>
        {/*<Dependents count={hit.dependents}/>*/}

        <CompatibilityIcons
          android={hit.compatibility.indexOf("Android") >= 0}
          ios={hit.compatibility.indexOf("iOS") >= 0}
          windows={hit.compatibility.indexOf("Windows") >= 0}
          css={hit.styling.indexOf("Inline Styles") < 0 && (hit.collections.indexOf("React") >= 0 || hit.collections.indexOf("Vue") >= 0)}
          repositoryUrl={`https://github.com/${hit.repositoryUser}/${hit.repositoryName}`}
        />
      </div>
    </div>
  );
};

export default Hit;
