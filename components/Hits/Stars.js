import React from 'react';
import pluralize from "./pluralize";
import humanizedNumber from "./humanizedNumber";
import { averages, thresholds } from "./constants";

function Star({count}) {
  return (
    <span
      className={`mr-4 tooltipped tooltipped-s tooltipped-no-delay inline-flex items-center ${
        count > thresholds.stars ? "text-orange-900" : "text-gray-900"
      }`}
      aria-label={`${count} ${pluralize(count, "star")} on GitHub${
        count > averages.stars ? " (above average)" : ""
      }`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="13" className="inline fill-current" height="12" viewBox="0 0 13 12">
      <polygon
        points="6.285 9.644 10.169 12 9.138 7.561 12.57 4.573 8.051 4.188 6.285 .001 4.519 4.188 0 4.573 3.432 7.561 2.401 12"/>
    </svg>
      {" "}
      {humanizedNumber(count)}
  </span>
  );
}

export default Star;
