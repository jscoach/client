import React from "react";
import TimeAgo from "timeago-react";
import { format } from 'timeago.js';
import BundleSize from "./BundleSize";
import ExternalLinks from "./ExternalLinks";
import { averages } from "./constants";
import CompatibilityIcon from "./CompatibilityIcon";
import MediaQuery from "react-responsive";
import Advertisement from "../Advertisement";

const ExpandedHit = ({hit, location}) => {
  const popular =
    hit.stars > averages.stars ||
    hit.downloads > averages.downloads ||
    hit.dependents > averages.dependents;

  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  const outdated = new Date(hit.pushedAt) < twoYearsAgo;

  return (
    <div className="relative bg-white px-4 py-6">


      <h4 className="mb-3 font-bold text-sm uppercase text-gray-600 ">
        Last {hit.modifiedAt === hit.publishedAt ? "published " : "updated "}

        {hit.collections.length > 0 && (
          <>
            {hit.communityPick &&
            <span className="border border-green-900 text-green-900 rounded-full ml-4 px-3 py-1">Community pick</span>}
            {!hit.communityPick && popular &&
            <span
              className="border border-orange-900 text-orange-900 rounded-full px-3 py-1 ml-4 font-bold text-center">Popular</span>}
            {!hit.communityPick &&
            !popular &&
            outdated && <span
              className="border border-red-700 text-red-700 rounded-full px-3 py-1 ml-4 font-bold text-center">Outdated</span>}
          </>
        )}
      </h4>
      <div>
        <span className="font-semibold mr-2">v{hit.latestRelease}</span> <TimeAgo
        datetime={hit.modifiedAt}
        className="cursor-default z-30 tooltipped tooltipped-s tooltipped-multiline tooltipped-no-delay"
        aria-label={`Updated release ${format(hit.modifiedAt)}\nFirst published ${format(
          hit.publishedAt
        )}\nLatest commit ${format(hit.pushedAt)}`}
      />{" "}
      </div>
      <div className="mb-2">
        <h4 className="mt-3 pt-3 mb-3 border-t border-gray-200 font-bold text-sm uppercase text-gray-600">Install</h4>
        <pre className="bg-gray-100 rounded-sm px-2 py-3 mb-2 text-gray-800 overflow-x-scroll text-sm select-all"><code>
          <span className="text-red-600">npm</span> install {hit.name}</code></pre>
        <pre
          className="bg-gray-100 rounded-sm px-2 py-3 text-gray-800 overflow-x-scroll text-sm select-all"><code><span
          className="text-red-600">yarn</span> add {hit.name}</code></pre>
        <ul className="mt-2">
          <li className="block">
            <a href={`https://npm.runkit.com/${hit.name}`} target="_blank"
               className="hover:bg-gray-200 py-3 px-3 rounded-md block">
              <CompatibilityIcon className="text-green-500">
                <g stroke="none" strokeWidth="1" fillRule="evenodd">
                  <polygon id="Rectangle-161" points="4 4 16 10 4 16"/>
                </g>
              </CompatibilityIcon> Try on RunKit
            </a>
          </li>
        </ul>
        <BundleSize {...hit}/>
        <h4
          className="mt-3 pt-3 mb-3 border-t border-gray-200 font-bold text-sm mt-5 uppercase text-gray-600 mb-1">CDNs</h4>
        <ul className="leading-10">
          <li className="truncate">
            JSDELIVR <a
            href={`https://www.jsdelivr.com/package/npm/${hit.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800">
            jsdelivr.com/package/npm/{hit.name}
          </a>
          </li>
          <li className="truncate">
            UNPKG <a
            href={`https://unpkg.com/${hit.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800">
            unpkg.com/{hit.name}
          </a>
          </li>
        </ul>

        <h4
          className="mt-3 pt-3 mb-3 border-t border-gray-200 font-bold text-sm mt-5 uppercase text-gray-600 mb-1">extras</h4>
        <ExternalLinks {...hit} />

        <h4
          className="mt-3 pt-3 mb-3 border-t border-gray-200 font-bold text-sm mt-5 uppercase text-gray-600 mb-1">Contributors</h4>
        <ul className="leading-10">
          <li>
            <a href={`https://github.com/${hit.repositoryUser}`}
               target="_blank"
               rel="noopener noreferrer"
               className="tooltipped tooltipped-s tooltipped-no-delay inline-block"
               aria-label={hit.repositoryUser}>
              <img src={`${hit.repositoryUserAvatar}&s=128`} alt={hit.repositoryUser}
                   className="rounded-lg mr-1 bg-gray-100 inline-block align-middle w-16 h-16 opacity-90 hover:opacity-100"
              />
            </a>
          </li>
        </ul>
      </div>
      <MediaQuery minDeviceWidth={1024}>
        <div className="my-12 mx-auto">
          <Advertisement/>
        </div>
      </MediaQuery>
    </div>
  );
};

export default ExpandedHit;
