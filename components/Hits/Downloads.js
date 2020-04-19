import { averages, thresholds } from "./constants";
import pluralize from "./pluralize";
import humanizedNumber from "./humanizedNumber";
import React from "react";

const Downloads = ({count}) => (
  <span
    className={`mr-4 tooltipped tooltipped-s tooltipped-multiline tooltipped-no-delay inline-flex items-center ${
      count > thresholds.downloads ? "text-teal-600" : "text-gray-900"
    }`}
    aria-label={`${count} ${pluralize(count, "download")} from npm\nin the last 30 days${
      count > averages.downloads ? " (above average)" : ""
    }`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="inline fill-current mr-1" width="12" height="12" viewBox="0 0 20 20">
						<g stroke="none" strokeWidth="1">
								<path d="M13,8 L13,2 L7,2 L7,8 L2,8 L10,16 L18,8 L13,8 Z M0,18 L20,18 L20,20 L0,20 L0,18 Z"/>
						</g>
    </svg>
    {" "}
    {humanizedNumber(count)}
  </span>
);

export default Downloads;
